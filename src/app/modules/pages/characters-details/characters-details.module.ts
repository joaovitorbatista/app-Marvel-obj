import { CharactersDetailsComponent } from './characters-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PagesRoutingModule } from '../pages-routing.module';





@NgModule({
  declarations: [CharactersDetailsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PagesRoutingModule
  ]
})
export class CharactersModule { }
