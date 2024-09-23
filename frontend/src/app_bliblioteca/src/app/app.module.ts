import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SaveComponent } from './pages/save/save.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { SearchComponent } from './pages/search/search.component';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { TopComponent } from './pages/top/top.component';
import { CrearUserComponent } from './components/modals/admin-modals/crear-user/crear-user.component';
import { EditarUserComponent } from './components/modals/admin-modals/editar-user/editar-user.component';
import { CrearPrestamoComponent } from './components/modals/admin-modals/crear-prestamo/crear-prestamo.component';
import { EditarPrestamoComponent } from './components/modals/admin-modals/editar-prestamo/editar-prestamo.component';
import { CrearLibroComponent } from './components/modals/admin-modals/crear-libro/crear-libro.component';
import { EditarLibroComponent } from './components/modals/admin-modals/editar-libro/editar-libro.component';
import { CrearResenaComponent } from './components/modals/user-modals/crear-resena/crear-resena.component';
import { EditarPerfilComponent } from './components/modals/user-modals/editar-perfil/editar-perfil.component';

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
    SaveComponent,
    BookItemComponent,
    SearchComponent,
    TopComponent,
    BookModalComponent,
    CrearUserComponent,
    EditarUserComponent,
    CrearPrestamoComponent,
    EditarPrestamoComponent,
    CrearLibroComponent,
    EditarLibroComponent,
    CrearResenaComponent,
    EditarPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
