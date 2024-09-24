import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { SaveComponent } from './pages/save/save.component';
import { SearchComponent } from './pages/search/search.component';
import { TopComponent } from './pages/top/top.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'prestamo', component: PrestamoComponent },  
  { path: 'prestamo/:id/:rol', component: PrestamoComponent },
  { path: 'save', component: SaveComponent },
  { path: 'search', component: SearchComponent },
  { path: 'top', component: TopComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
