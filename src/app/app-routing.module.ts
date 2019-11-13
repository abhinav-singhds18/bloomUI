import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard-form', component: DashboardFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
