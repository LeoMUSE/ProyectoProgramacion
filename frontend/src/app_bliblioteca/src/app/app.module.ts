import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
import { AddIconComponent } from './components/add-icon/add-icon.component';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { AbmModalComponent } from './components/modals/abm-modal/abm-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SaveComponent } from './pages/save/save.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { SearchComponent } from './pages/search/search.component';
import { TopComponent } from './pages/top/top.component';

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
    SearchbarComponent,
    AddIconComponent,
    BookModalComponent,
    AbmModalComponent,
    SaveComponent,
    BookItemComponent,
    SearchComponent,
    TopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
