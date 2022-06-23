import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { Employee } from 'src/app/pages/tables/models';
import { CadastroMedicoService } from '../cadastro-medico.service';
import { CadastroMedicoModel } from '../model/cadastro-medico.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  public displayedColumns: string[] = [
    'nome',
    'email',
    'registroProfissional',
    'menu',
  ];
  public dataSource: MatTableDataSource<CadastroMedicoModel>;
  public selection = new SelectionModel<CadastroMedicoModel>(true, []);
  public supportRequestData: CadastroMedicoModel[];
  public isShowFilterInput = false;
  public routers: typeof routes = routes;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  constructor(
    private service: CadastroMedicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.salvarLocalStorage();
    // this.load();
  }

  public ngOnInit(): void {
    this.load()
  }

  load() {
    this.supportRequestData = this.service.carregarListaMedico();
    this.dataSource = new MatTableDataSource<CadastroMedicoModel>(this.supportRequestData);

    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<CadastroMedicoModel>(this.supportRequestData);
  }


  public onDelete(crm: string) {
    this.service.delete(crm);

    this.load();
  }

  onEdit(id: number) {}

  onCreate() {
    this.router.navigate([this.routers.CADASTRO_MEDICO_PROFILE], { relativeTo: this.route });
  }
}
