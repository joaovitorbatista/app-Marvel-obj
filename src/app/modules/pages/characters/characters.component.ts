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
  public count: any;
  public offset: any;
  public limit: number = 0;
  public totalPages = 0;

  public num: number = 0;

  isLoading: boolean = false;
  hasError: boolean = false;

  currentPage = 1;
  total = 50;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _charactersService: CharactersService,
    private Router: Router,
    private router: ActivatedRoute,
    private _def: ChangeDetectorRef
  ) {
    router.params.subscribe((params) => {
      if (params["num"]) {
        this.num = Number(params["num"])
        this._charactersService.getCharacters(this.num*156.2)
        .subscribe({
          next: (res) => {
            this.characters = res.data.results;
            this.totalPages = res.data.total/156.2;
          }
        });
      }
    });

  }

  ngOnInit() {
    this.getListCharacters();
  }

  getListCharacters(): void {

    this.isLoading = true;
    this.hasError = false;

    this._charactersService.getCharacters(this.num*156.2)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.characters = res.data.results;
          this.totalPages = res.data.total/156.2;
          this.count = res.data.count
          this.offset = res.data.offset
          this.limit = res.data.limit

          console.log("total", this.total);
          console.log("characters", this.characters.length*156.2);
          console.log("totalPages", this.totalPages);
          console.log("count", this.count);
          console.log("num", this.num);
          console.log("limit", this.limit);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      });
  }

  search() {
    this._charactersService.getCharactersByName(this.name)
    .subscribe({
      next: (res) => {
        this.characters = res.data.results;
        console.log(this.characters)
        this.totalPages = res.data.total/156.2
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
  }

}
