import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/consts/customer-validators';
import { DialogData } from 'src/app/pages/fila/component/fila.components';
import { CadastroPacienteService } from '../../cadastro-paciente.service';
import { CadastroPacienteModel } from '../../model/cadastro-paciente.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public cadastroForm: FormGroup;
  public enderecoForm: FormGroup;
  public editar = false;

  constructor(
    public service: CadastroPacienteService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    this.buildForm();

    if (this.data != null) {
      this.cadastroForm.patchValue(this.data);
      this.enderecoForm.patchValue(this.data);
      this.editar = true;
    }
  }

  public onSubmit() {

    if (this.cadastroForm.valid && this.enderecoForm.valid) {

      var cadastro = this.cadastroForm.value
      var endereco = this.enderecoForm.value

      var dados = {} as CadastroPacienteModel;

      // Dados Pessoais
      dados.nome = cadastro.nome
      dados.email = cadastro.email
      dados.genero = cadastro.genero
      dados.dataNascimento = cadastro.dataNascimento
      dados.cpf = cadastro.cpf

      // Endereco
      dados.cep = endereco.cep
      dados.logradouro = endereco.logradouro
      dados.bairro = endereco.bairro
      dados.localidade = endereco.localidade
      dados.uf = endereco.uf
      dados.numero = endereco.numero
      dados.complemento = endereco.complemento


      this.service.create(dados, this.editar);

      this.cadastroForm.reset();
      this.enderecoForm.reset();

      this.dialogRef.close();
    }

  }

  public buscaCep() {

    var cep = this.enderecoForm.controls['cep'].value
    const API_CEP = 'http://viacep.com.br/ws/' + cep + '/json/';

    fetch(API_CEP, { mode: 'cors', method: 'GET' })
      .then(dados => dados.json())
      .then(dados => {

        this.enderecoForm.patchValue(dados)

      })
      .catch(err => { });
  }

  public buildForm() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
    });

    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      complemento: [''],
    });
  }
}
