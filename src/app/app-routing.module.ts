import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './pages/auth/guards';
import { TelaInicialComponent } from './pages/home/tela-inicial/tela-inicial.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: TelaInicialComponent,
  },
  {
    path: 'cadastro/medico',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cadastro/medico/cadastro-medico.module').then(
        (m) => m.CadastroMedicoModule
      ),
  },
  {
    path: 'cadastro/paciente',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cadastro/paciente/cadastro-paciente.module').then(
        (m) => m.CadastroPacienteModule
      ),
  },
  {
    path: 'fila',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/fila/fila.module').then((m) => m.FilaModule),
  },
  {
    path: 'typography',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/typography/typography.module').then(
        (m) => m.TypographyModule
      ),
  },
  {
    path: 'tables',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'notification',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: 'ui',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/ui-elements/ui-elements.module').then(
        (m) => m.UiElementsModule
      ),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
