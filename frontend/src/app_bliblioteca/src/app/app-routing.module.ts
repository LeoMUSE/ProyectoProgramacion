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
import { ReviewComponent } from './pages/review/review.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { authSessionGuard } from './guards/auth-session.guard';
import { adminSessionGuard } from './guards/admin-session.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notificaciones', component: NotificacionesComponent, canActivate:[authSessionGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'perfil', component: PerfilComponent, canActivate:[authSessionGuard]},
  { path: 'prestamo', component: PrestamoComponent, canActivate:[authSessionGuard]},  
  { path: 'prestamo/:id/:rol', component: PrestamoComponent, canActivate:[adminSessionGuard]},
  { path: 'save', component: SaveComponent, canActivate:[authSessionGuard]},
  { path: 'search', component: SearchComponent },
  { path: 'top', component: TopComponent },
  { path: 'tools', component: ToolsComponent, canActivate:[adminSessionGuard]},
  { path: 'users', component: UsersComponent, canActivate:[adminSessionGuard]},
  { path: 'review', component: ReviewComponent, canActivate:[adminSessionGuard]},
  { path: 'catalogo', component: CatalogoComponent, canActivate:[adminSessionGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
