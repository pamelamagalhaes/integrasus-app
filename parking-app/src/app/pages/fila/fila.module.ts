import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FilaService } from './fila.service';
import { FilaComponent } from './component/fila.components';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TriagemDialogComponent } from './dialog/triagem-dialog/triagem-dialog.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { ProntuarioComponent } from './prontuario/prontuario.component';


const routes: Routes = [
  {
    path: '',
    component: FilaComponent,
  },
  {
    path: 'prontuario/:id',
    component: ProntuarioComponent,
  },

];

@NgModule({
  declarations: [FilaComponent, TriagemDialogComponent, ProntuarioComponent],
  imports: [
    MatMenuModule,
    MatTableModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule, MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [FilaService],
})
export class FilaModule { }

