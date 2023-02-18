import { CharactersService } from '../../../core/service/characters.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
  public name: string = '';
  public characters: any;
  public limit: number = 0;
  public totalPages = 0;

  isLoading: boolean = false;
  hasError: boolean = false;
  currentPage = 1;
  total = 50;
  totalResult!: number;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _charactersService: CharactersService,
    private Router: Router,
    private router: ActivatedRoute,
    private _def: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getListCharacters();
  }

  getListCharacters(): void {
    this.isLoading = true;
    this.hasError = false;

    this._charactersService.getCharacters((this.currentPage - 1) * 10)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.characters = res.data.results;
          this.totalResult = res.data.total / 10;
          this.totalPages = res.data.total / this.totalResult;
          this.limit = res.data.limit
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      });
  }

  search() {
    this.isLoading = true;
    this.hasError = false;

    this._charactersService.getCharactersByName(this.name)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe({
        next: (res) => {
          this.characters = res.data.results;
          this.total = res.data.total;
          this.totalResult = res.data.total / 10;
          this.totalPages = res.data.total / this.totalResult;
          this.limit = res.data.limit
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.getListCharacters();
  }
}
