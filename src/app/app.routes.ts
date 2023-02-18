import { Routes } from '@angular/router';
import { CharactersDetailsComponent } from './modules/pages/characters-details/characters-details.component';
import { CharactersComponent } from './modules/pages/characters/characters.component';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters-details/:num', component: CharactersDetailsComponent },
  { path: 'characters-details/:id', component: CharactersDetailsComponent },
  { path: '**', redirectTo: 'error/404' },
]
