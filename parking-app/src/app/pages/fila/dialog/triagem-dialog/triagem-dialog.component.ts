import { Component, Inject, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FilaService } from '../../fila.service';
import { ProntuarioModel } from '../../model/prontuario.model';
import {v4 as uuidv4} from 'uuid';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-triagem-dialog',
  templateUrl: './triagem-dialog.component.html',
  styleUrls: ['./triagem-dialog.component.scss']
})
export class TriagemDialogComponent implements OnInit {

  public cadastroForm: FormGroup;
  public queixaForm: FormGroup;
  public sinaiVitaisForm: FormGroup;
  public sintomaRespForm: FormGroup;
  public locomocaoForm: FormGroup;

  public editar = false;

  @Inject(MAT_DIALOG_DATA) public data: DialogData;
  constructor(
    public fb: FormBuilder,
    private service: FilaService,
    public dialogRef: MatDialogRef<TriagemDialogComponent>
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
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
  }

  public buscarPaciente() {
    var cpf = this.cadastroForm.controls['cpf'].value
    var paciente = this.service.buscarPaciente(cpf)

    this.cadastroForm.patchValue(paciente)

  }

  public onSubmit() {

    if (this.cadastroForm.valid
      && this.queixaForm.valid
      && this.sinaiVitaisForm.valid
      && this.sintomaRespForm.valid
      && this.locomocaoForm.valid) {

      var cadastro = this.cadastroForm.value
      var queixa = this.queixaForm.value
      var sinaiVitais = this.sinaiVitaisForm.value
      var sintomaResp = this.sintomaRespForm.value
      var locomocao = this.locomocaoForm.value


      var dados = {} as ProntuarioModel;

      dados.id = uuidv4();
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

      dados.ativo = true


      // Locomoção
      dados.locomocao = locomocao.locomocao

      this.service.create(dados, this.editar);

      this.cadastroForm.reset();
      this.queixaForm.reset();
      this.sinaiVitaisForm.reset();
      this.sintomaRespForm.reset();
      this.locomocaoForm.reset();

      this.dialogRef.close();
    }

  }
}


