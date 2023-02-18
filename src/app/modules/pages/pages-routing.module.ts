import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';

export const routes: Routes = [

      { path: '', redirectTo: 'characters', pathMatch: 'full' },
      { path: 'characters', component: CharactersComponent },
      { path: 'characters-details/:id', component: CharactersDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
