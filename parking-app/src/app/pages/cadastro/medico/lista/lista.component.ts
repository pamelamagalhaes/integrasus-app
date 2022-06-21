import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { CadastroMedicoService } from '../cadastro-medico.service';
import { CadastroMedicoModel } from '../model/cadastro-medico.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  public routers: typeof routes = routes;

  public displayedColumns: string[] = [
    'nome',
    'idade',
    'email',
    'dataNascimento',
    'sexo',
    'registroProfissional',
    'menu',
  ];

  public supportRequestData$: Observable<CadastroMedicoModel[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: CadastroMedicoService,
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

  public onDelete(id: number) {
    this.service.delete(id);

    this.load();
  }

  onEdit(id: number) {}

  onCreate() {
    this.router.navigate([this.routers.CADASTRO_MEDICO_PROFILE], { relativeTo: this.route });
  }
}
