import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TriagemModel } from './model/triagem.model';

@Injectable({
  providedIn: 'root',
})
export class TriagemService {
  public salvarLocalStorage() {

  var db = JSON.parse(localStorage.getItem('db_paciente'));

    // if (!db) {
    //   db = db_paciente;
    //   this.updateLocalStorage(db)
    // }
  }

  public carregarTriagem(): Observable<TriagemModel[]> {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));
    return of(dados);
  }

  public delete(cpf: string) {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));

    dados = dados.filter(a => a.cpf != cpf);

    this.updateLocalStorage(dados)
  }

  public create(cadastro: TriagemModel) {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));

    // dados.find(a => a.registroProfissional == cadastro.registroProfissional)

    dados.push(cadastro)

    this.updateLocalStorage(dados)
  }

  updateLocalStorage(db) {
    // Atualiza dados LocalStorge
    localStorage.setItem('db_paciente', JSON.stringify(db));
  }
}
