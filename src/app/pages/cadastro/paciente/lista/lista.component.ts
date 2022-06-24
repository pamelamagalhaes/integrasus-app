import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { CadastroPacienteService } from '../cadastro-paciente.service';
import { ProfileComponent } from '../dialog/profile/profile.component';
import { CadastroPacienteModel } from '../model/cadastro-paciente.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaPacienteComponent implements OnInit {

  public displayedColumns: string[] = [
    'nome',
    'email',
    'cpf',
    'menu',
  ];
  public dataSource: MatTableDataSource<CadastroPacienteModel>;
  public selection = new SelectionModel<CadastroPacienteModel>(true, []);
  public supportRequestData: CadastroPacienteModel[];
  public isShowFilterInput = false;
  public routers: typeof routes = routes;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private service: CadastroPacienteService,
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
    this.supportRequestData = this.service.carregarListaPaciente();
    this.dataSource = new MatTableDataSource<CadastroPacienteModel>(this.supportRequestData);

    this.dataSource.paginator = this.paginator;
  }

  public onDelete(cpf: string) {
    this.service.delete(cpf);

    this.load();
  }

  onCreate() {
    this.router.navigate([this.routers.CADASTRO_PACIENTE_PROFILE], { relativeTo: this.route });
  }

  onProntuario(cpf: string) {
    this.router.navigate([this.routers.LISTA_PRONTUARIO, cpf], { relativeTo: this.route });
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
    this.dataSource = new MatTableDataSource<CadastroPacienteModel>(this.supportRequestData);
  }

  onEdit(cpf: string) {
    var cadastro = this.supportRequestData.find(a => a.cpf == cpf)

    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '800px', height: '700px',
      data: cadastro,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  onExame(cpf: string) {
    // var cadastro = this.supportRequestData.find(a => a.cpf == cpf)

    // const dialogRef = this.dialog.open(ExameComponent, {
    //   width: '800px', height: '700px',
    //   // data: cadastro,
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.load();
    // });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '800px', height: '730px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
      // this.animal = result;
    });
  }

}


