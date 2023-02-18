import { Character } from '../../../core/models/characters.types';
import { CharactersService } from '../../../core/service/characters.service';
import { Component } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.css']
})
export class CharactersDetailsComponent {

  public character!: Character;
  public userId!: string;

  isLoading: boolean = false;
  hasError: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _charactersService: CharactersService,
    private Router: Router,
    private router: ActivatedRoute
  ) {
    router.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }

  ngOnInit() {
    this.getListCharacters();
  }

  getListCharacters(): void {

    this.isLoading = true;
    this.hasError = false;

    this._charactersService.getCharactersById(this.userId)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.character = res.data.results[0];
        },
        error: (error) => {
          console.log(error);
          this.hasError = true;
        }
      })
  }

}
