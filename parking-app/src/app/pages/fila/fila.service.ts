import { Injectable } from '@angular/core';
import { CadastroPacienteModel } from './model copy/cadastro-paciente.model';
import { ProntuarioModel } from './model/prontuario.model';

@Injectable({
  providedIn: 'root',
})
export class FilaService {
  public salvarLocalStorage() {

    // colocar fila previa
    let db_fila = [];

    var db = JSON.parse(localStorage.getItem('db_fila'));

    if (!db) {
      db = db_fila;
      this.updateLocalStorage(db)
    }
  }

  public carregarFilaAtendimento(): ProntuarioModel[] {
    var dados = JSON.parse(localStorage.getItem('db_fila'));
    return dados;
  }

  public delete(cpf: string) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    dados = dados.filter(a => a.cpf != cpf);

    this.updateLocalStorage(dados)
  }

  public create(triagem: ProntuarioModel, editar: boolean) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    if (!editar) {
      dados.push(triagem)
    }
    else {
      dados = dados.filter(a => a.cpf !== triagem.cpf)

      dados.push(triagem)
    }

    this.updateLocalStorage(dados)
  }

  updateLocalStorage(db) {
    // Atualiza dados LocalStorge
    localStorage.setItem('db_fila', JSON.stringify(db));
  }

  public buscar(cpf: string): CadastroPacienteModel{
    return JSON.parse(localStorage.getItem('db_paciente')).find(a => a.cpf === cpf);
  }
}
