import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent }   from './search/search.component';
import { ListComponent }      from './list/list.component';
import { AppComponent }  from './app.component';
 
const routes: Routes = [
  {path: '', component: AppComponent},
  { path: 'search', component: SearchComponent, data: {animation: 'SearchPage'} },
  { path: 'list', component: ListComponent, data: {animation: 'ListPage'} },
  { path: 'main', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
