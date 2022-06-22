import { Component, Input, OnInit } from '@angular/core';

import { Customer } from '../../models';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  @Input() materialTableDate: Customer[];
  public displayedColumns: string[] = ['data/hora', 'nome', 'cpf', 'sexo', 'status'];
  public dataSource: Customer[];

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
  }
}
