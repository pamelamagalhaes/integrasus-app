import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { CadastroPacienteService } from '../cadastro-paciente.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent implements OnInit {
  id: string = null;
  public routers: typeof routes = routes;

  public cadastroForm: FormGroup;
  public queixaForm: FormGroup;
  public sinaiVitaisForm: FormGroup;
  public sintomaRespForm: FormGroup;
  public locomocaoForm: FormGroup;
  public prontuarioForm: FormGroup;

  public editar = false;

  constructor(
    private route: ActivatedRoute, 
    public fb: FormBuilder, 
    private service: CadastroPacienteService, 
    private router: Router,
    private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.buildForm();


    if (this.id != null) {
      var data = this.service.buscarProntuario(this.id)
      this.cadastroForm.patchValue(data);
      this.queixaForm.patchValue(data);
      this.sinaiVitaisForm.patchValue(data);
      this.sintomaRespForm.patchValue(data);
      this.locomocaoForm.patchValue(data);
      this.prontuarioForm.patchValue(data)
      this.editar = true;
    }
  }

  backClicked() {
    this._location.back();
  }

  public buildForm() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.queixaForm = this.fb.group({
      queixa: ['', [Validators.required]],
    });

    this.sinaiVitaisForm = this.fb.group({
      pa: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fr: ['', [Validators.required]],
    });

    this.sintomaRespForm = this.fb.group({
      sintomaResp: ['', [Validators.required]],
      sp: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      doencasSistemicas: ['', [Validators.required]],
    });

    this.locomocaoForm = this.fb.group({
      locomocao: ['', [Validators.required]],
    });

    this.prontuarioForm = this.fb.group({
      diagnostico: ['', [Validators.required]],
      sintomas: ['', [Validators.required]],
      doencaAtual: ['', [Validators.required]],
      doencaPregressa: ['', [Validators.required]],
      cirurgia: ['', [Validators.required]],
      medicacao: ['', [Validators.required]],
      testes: ['', [Validators.required]],
      alergias: ['', [Validators.required]],
      evolucao: ['', [Validators.required]],
    });
  }
}
