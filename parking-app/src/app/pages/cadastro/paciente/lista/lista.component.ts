import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { CadastroPacienteService } from '../cadastro-paciente.service';
import { CadastroPacienteModel } from '../model/cadastro-paciente.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaPacienteComponent implements OnInit {

  public routers: typeof routes = routes;

  public displayedColumns: string[] = [
    'nome',
    'idade',
    'email',
    'dataNascimento',
    'sexo',
    'cpf',
    'menu',
  ];

  public supportRequestData$: Observable<CadastroPacienteModel[]>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: CadastroPacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.salvarLocalStorage();
    this.load();
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.supportRequestData$ = this.service.carregarListaMedico();
  }

  public onDelete(cpf: string) {
    this.service.delete(cpf);

    this.load();
  }

  onEdit(cpf: string) {}

  onCreate() {
    this.router.navigate([this.routers.CADASTRO_PACIENTE_PROFILE], { relativeTo: this.route });
  }

}


