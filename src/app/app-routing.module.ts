import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PhaplyComponent } from './components/phaply/phaply.component';
import { KyguiComponent } from './components/kygui/kygui.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { MainPageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersmanageComponent } from './admin/usersmanage/usersmanage.component';
import { PagesmanageComponent } from './admin/pagesmanage/pagesmanage.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'prod',
        component: ProductdetailComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'ky gui',
        component: KyguiComponent
      },
      {
        path: 'phap ly',
        component: PhaplyComponent
      }
      ]
    },
    {
      path: 'dashboard',
    component: DashboardComponent
  },
  {
      path: 'usersmanage',
    component: UsersmanageComponent
  },
  {
      path: 'pagesmanage',
    component: PagesmanageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
