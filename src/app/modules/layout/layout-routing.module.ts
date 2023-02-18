import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('../pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
