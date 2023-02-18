import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { CharactersComponent } from './characters/characters.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    PagesComponent,
    CharactersComponent,
    CharactersDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    PaginationModule.forRoot()
  ]
})
export class PagesModule { }
