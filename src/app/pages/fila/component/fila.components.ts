import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { TriagemDialogComponent } from '../dialog/triagem-dialog/triagem-dialog.component';
import { FilaService } from '../fila.service';
import { ProntuarioModel } from '../model/prontuario.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-fila',
  templateUrl: './fila.components.html',
  styleUrls: ['./fila.components.scss']
})
export class FilaComponent implements OnInit {

  public displayedColumns: string[] = [
    'dataAtendimento',
    'nome',
    'status',
    'menu',
  ];
  public dataSource: MatTableDataSource<ProntuarioModel>;
  public selection = new SelectionModel<ProntuarioModel>(true, []);
  public supportRequestData: ProntuarioModel[];
  public isShowFilterInput = false;
  public routers: typeof routes = routes;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  animal: string;
  name: string;

  constructor(
    private service: FilaService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.service.salvarLocalStorage();
    // this.load();
  }

  public ngOnInit(): void {
    this.load()
  }

  load() {
    this.supportRequestData = this.service.carregarFilaAtendimento();
    this.dataSource = new MatTableDataSource<ProntuarioModel>(this.supportRequestData);

    this.dataSource.paginator = this.paginator;
  }

  public onProntuario(cpf: string) {
    this.router.navigate([this.routers.PRONTUARIO, cpf], { relativeTo: this.route });
  }

  public onDelete(id: string) {
    this.service.delete(id);

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
    this.dataSource = new MatTableDataSource<ProntuarioModel>(this.supportRequestData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TriagemDialogComponent, {
      width: '800px', height: '700px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
