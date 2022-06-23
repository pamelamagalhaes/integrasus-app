import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilaModel } from './model/fila.model';

@Injectable({
  providedIn: 'root',
})
export class FilaService {
  public salvarLocalStorage() {

    // colocar fila previa
    let db_fila = [
      {

        nome: 'Baegarz Albuquerque',
        idade: 35,
        email: 'baegarz@gogo.net',
        dataNascimento: '23/04/1985',
        sexo: 'Feminino',
        endereço: 'Rua Tijucas do sul',
        numero: 70,
        complemento: 'Casa',
        cpf: '724.775.230-07',
      },
      {

        nome: 'Rein Mariano',
        idade: 68,
        email: 'rein@april.biz',
        dataNascimento: '19/02/1950',
        sexo: 'Masculino',
        endereço: 'Rua Augusto Freitas',
        numero: 367,
        complemento: 'Casa',
        cpf: '768.511.260-44',
      },
      {

        nome: 'Pape de Jesus',
        idade: 27,
        email: 'papea@oioi.net',
        dataNascimento: '14/08/1994',
        sexo: 'Feminino',
        endereço: 'Rua Ramiro Freitas',
        numero: 85,
        complemento: 'Apto 202 bloco A',
        cpf: '554.763.010-11',
      },
      {

        nome: 'Poyma dos Santos',
        idade: 30,
        email: 'poym@yesenia.net',
        dataNascimento: '14/08/1992',
        sexo: 'Feminino',
        endereço: 'Rua José Francisco',
        numero: 120,
        complemento: 'Apto 106 bloco C',
        cpf: '146.883.290-59',
      },
      {

        nome: 'Edhelxi Siva',
        idade: 30,
        email: 'edhelxi.silva@gogo.net',
        dataNascimento: '14/08/1992',
        sexo: 'Feminino',
        endereço: 'Rua José Francisco',
        numero: 120,
        complemento: 'Apto 106 bloco C',
        cpf: '115.509.620-78',
      },
    ];

    var db = JSON.parse(localStorage.getItem('db_fila'));

    if (!db) {
      db = db_fila;
      this.updateLocalStorage(db)
    }
  }

  public carregarFilaAtendimento(): FilaModel[] {
    var dados = JSON.parse(localStorage.getItem('db_fila'));
    return dados;
  }

  public delete(cpf: string) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    dados = dados.filter(a => a.cpf != cpf);

    this.updateLocalStorage(dados)
  }

  public create(triagem: FilaModel) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    // dados.find(a => a.registroProfissional == cadastro.registroProfissional)

    dados.push(triagem)

    this.updateLocalStorage(dados)
  }

  updateLocalStorage(db) {
    // Atualiza dados LocalStorge
    localStorage.setItem('db_fila', JSON.stringify(db));
  }
}
