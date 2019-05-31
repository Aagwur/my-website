import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent }   from './search/search.component';
import { ListComponent }      from './list/list.component';
import { MoreComponent }      from './more/more.component';
import { AppComponent }  from './app.component';
 
const routes: Routes = [
  {path: '', component: SearchComponent},
  { path: 'search', component: SearchComponent, data: {animation: 'SearchPage'} },
  { path: 'list', component: ListComponent, data: {animation: 'ListPage'} },
  { path: 'more', component: MoreComponent, data: {animation: 'MorePage'}},
  { path: 'main', component: AppComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
