import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeBookCardComponent } from './components/home-book-card/home-book-card.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { LoanItemComponent } from './components/loan-item/loan-item.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent,
    HomeBookCardComponent,
    LoginComponent,
    NotificacionesComponent,
    SignupComponent,
    PerfilComponent,
    PrestamoComponent,
    LoanItemComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
