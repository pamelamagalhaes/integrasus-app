import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CadastroPacienteService } from './cadastro-paciente.service';
import { ListaPacienteComponent } from './lista/lista.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './dialog/profile/profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ListaProntuarioComponent } from './lista-prontuario/lista-prontuario.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaPacienteComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'lista/prontuario/:cpf',
    component: ListaProntuarioComponent,
  },
  {
    path: 'analisar/prontuario/:id',
    component: ProntuarioComponent,
  },
];

@NgModule({
  declarations: [
    ListaPacienteComponent,
    ProfileComponent,
    ListaProntuarioComponent,
    ProntuarioComponent],
  imports: [
    MatMenuModule,
    MatTableModule,
    MatBadgeModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [CadastroPacienteService],
})
export class CadastroPacienteModule { }

