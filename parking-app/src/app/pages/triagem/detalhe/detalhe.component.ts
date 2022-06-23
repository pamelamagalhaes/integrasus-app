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

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public fb: FormBuilder,
    private service: TriagemService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {

  }


  onCreate() {
    this.router.navigate([this.routers.TRIAGEM], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.cadastroForm.valid) {
      this.cadastroForm.reset();
    }

    this.service.create(this.cadastroForm.value);

    this.router.navigate([this.routers.TRIAGEM], {
      relativeTo: this.route,
    });
  }
  public buildForm() {
    this.cadastroForm = this.fb.group({
      nome: [null, [Validators.required]],
      idade: [null, [Validators.required, CustomValidators.validateCharacters]],
      sexo: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      profissao: [null, [Validators.required]],
      quixaPrincipal: [null, [Validators.required]],
      pa: [null, [Validators.required]],
      fc: [null, [Validators.required]],
      fr: [null, [Validators.required]],
      sintomasRespiratorios: [null, [Validators.required]],
      sp02: [null, [Validators.required]],
      temperatura: [null, [Validators.required]],
      doencasSistemicas: [null, [Validators.required]],
    });


  }

}
