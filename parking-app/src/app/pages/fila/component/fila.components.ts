import { Component, OnInit } from '@angular/core';
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

  public routers: typeof routes = routes;

  public displayedColumns: string[] = [
    'nome',
    'idade',
    'email',
    'dataNascimento',
    'sexo',
    'cpf',
    'status',
  ];

  public supportRequestData$: Observable<FilaModel[]>;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: FilaService,
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
    this.supportRequestData$ = this.service.carregarFilaAtendimento();
  }

  public onDelete(cpf: string) {
    this.service.delete(cpf);

    this.load();
  }

  onEdit(cpf: string) {}

  onCreate() {
    this.router.navigate([this.routers.FILA], { relativeTo: this.route });
  }

}
