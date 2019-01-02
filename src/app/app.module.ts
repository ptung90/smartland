import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './components/home/home.component';
import { PagemanComponent } from './components/pageman/pageman.component';
import { BannermanComponent } from './components/bannerman/bannerman.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';

import { Ng5SliderModule } from 'ng5-slider';
import { NgxCurrencyModule } from "ngx-currency";

import { ProdDialog } from './components/prod-dialog/prod-dialog.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { KyguiComponent } from './components/kygui/kygui.component';
import { PhaplyComponent } from './components/phaply/phaply.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './admin/login/login.component';
import { MainPageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersmanageComponent } from './admin/usersmanage/usersmanage.component';
import { PagesmanageComponent } from './admin/pagesmanage/pagesmanage.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pageman', component: PagemanComponent },
  { path: 'bannerman', component: BannermanComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagemanComponent,
    BannermanComponent,
    NavbarComponent,
    CarouselComponent,
    ProdDialog,
    SearchboxComponent,
    ProductdetailComponent,
    KyguiComponent,
    PhaplyComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    MainPageComponent,
    DashboardComponent,
    UsersmanageComponent,
    PagesmanageComponent
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    NgxCurrencyModule,
    AppRoutingModule
  ],
  exports: [ RouterModule ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ProdDialog ]
})
export class AppModule { }
