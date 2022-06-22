import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/app/consts';
import { CustomValidators } from 'src/app/consts/customer-validators';
import { TriagemModel } from '../model/triagem.model';
import { TriagemService } from '../triagem.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {
  public routers: typeof routes = routes;
  public cadastroForm: FormGroup;
  public displayedColumns: string[] = [
    'nome',
    'idade',
    'sexo',
    'cpf',
    'profissao',
    'quixaPrincipal',
    'pa',
    'fc',
    'fr',
    'sintomasRespiratorios',
    'spO2',
    'temperatura',
    'doençasSistemicas',
    'menu',
  ];

  public supportRequestData$: Observable<TriagemModel[]>;
  triagemForm: any;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public fb: FormBuilder,
    private service: TriagemService,
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
    this.supportRequestData$ = this.service.carregarTriagem();
  }

 /* public onDelete(cpf: string) {
    this.service.delete(cpf);

    this.load();
  }

  onEdit(cpf: string) {}*/

  onCreate() {
    this.router.navigate([this.routers.TRIAGEM], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.triagemForm.valid) {
      this.triagemForm.reset();
    }

    this.service.create(this.triagemForm.value);

    this.router.navigate([this.routers.TRIAGEM], {
      relativeTo: this.route,
    });
  }
  public buildForm() {
    this.triagemForm = this.fb.group({
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required, CustomValidators.validateCharacters]],
      sexo: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      profissao: ['', [Validators.required]],
      quixaPrincipal: ['', [Validators.required]],
      pa: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fr: ['', [Validators.required]],
      sintomasRespiratorios: ['', [Validators.required]],
      spO2: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      doençasSistemicas: ['', [Validators.required]],
    });


  }

}
