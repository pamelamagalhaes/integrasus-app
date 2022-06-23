import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { FilaService } from '../fila.service';
import { FilaModel } from '../model/fila.model';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.components.html',
  styleUrls: ['./fila.components.scss']
})
export class FilaComponent implements OnInit {

  public displayedColumns: string[] = [
    'nome',
    'email',
    'cpf',
    'menu',
  ];
  public dataSource: MatTableDataSource<FilaModel>;
  public selection = new SelectionModel<FilaModel>(true, []);
  public supportRequestData: FilaModel[];
  public isShowFilterInput = false;
  public routers: typeof routes = routes;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private service: FilaService,
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
    this.supportRequestData = this.service.carregarFilaAtendimento();
    this.dataSource = new MatTableDataSource<FilaModel>(this.supportRequestData);

    this.dataSource.paginator = this.paginator;
  }

  public onDelete(cpf: string) {
    this.service.delete(cpf);

    this.load();
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
    this.dataSource = new MatTableDataSource<FilaModel>(this.supportRequestData);
  }
}
