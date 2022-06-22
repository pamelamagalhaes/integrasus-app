import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetalheComponent } from './detalhe/detalhe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { TriagemService } from './triagem.service';
import {MatRadioModule} from '@angular/material/radio'

const routes: Routes = [
  {
    path: '',
    component: DetalheComponent,
  },
];

@NgModule({
  declarations: [DetalheComponent],
  imports: [
    MatMenuModule,
    MatTableModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [TriagemService],
})
export class TriagemModule {}
