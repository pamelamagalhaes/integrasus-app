import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { routes } from 'src/app/consts';
import { FilaService } from '../fila.service';
import { ProntuarioModel } from '../model/prontuario.model';
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
    private service: FilaService, 
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
      this.editar = true;
    }
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

  backClicked() {
    this._location.back();
  }

  public onSubmit() {

    if (this.cadastroForm.valid
      && this.queixaForm.valid
      && this.sinaiVitaisForm.valid
      && this.sintomaRespForm.valid
      && this.locomocaoForm.valid
      && this.prontuarioForm.valid) {

      var cadastro = this.cadastroForm.value
      var queixa = this.queixaForm.value
      var sinaiVitais = this.sinaiVitaisForm.value
      var sintomaResp = this.sintomaRespForm.value
      var locomocao = this.locomocaoForm.value
      var prontuario = this.prontuarioForm.value

      var dados = {} as ProntuarioModel;

      dados.id = this.id
      // Dados Pessoais
      dados.nome = cadastro.nome
      dados.genero = cadastro.genero
      dados.dataNascimento = cadastro.dataNascimento
      dados.cpf = cadastro.cpf
      dados.status = cadastro.status
      dados.dataAtendimento = moment().toDate();
      // Queixa
      dados.queixa = queixa.queixa

      // Sinais Vitais 
      dados.pa = sinaiVitais.pa
      dados.fc = sinaiVitais.fc
      dados.fr = sinaiVitais.fr

      // Sintoma Respiratório
      dados.sintomaResp = sintomaResp.sintomaResp
      dados.sp = sintomaResp.sp
      dados.temperatura = sintomaResp.temperatura
      dados.doencasSistemicas = sintomaResp.doencasSistemicas



      // Locomoção
      dados.locomocao = locomocao.locomocao

      // Prontuário
      dados.diagnostico = prontuario.diagnostico
      dados.sintomas = prontuario.sintomas
      dados.doencaAtual = prontuario.doencaAtual
      dados.doencaPregressa = prontuario.doencaPregressa
      dados.cirurgia = prontuario.cirurgia
      dados.medicacao = prontuario.medicacao
      dados.testes = prontuario.testes
      dados.alergias = prontuario.alergias
      dados.evolucao = prontuario.evolucao
      dados.ativo = false

      this.service.create(dados, this.editar);

      this.cadastroForm.reset();
      this.queixaForm.reset();
      this.sinaiVitaisForm.reset();
      this.sintomaRespForm.reset();
      this.locomocaoForm.reset();
      this.prontuarioForm.reset();

      this.router.navigate([this.routers.FILA], { relativeTo: this.route });
    }

  }
}
