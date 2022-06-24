import { Injectable } from '@angular/core';
import { CadastroPacienteModel } from './model/cadastro-paciente.model';
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
    var dados = JSON.parse(localStorage.getItem('db_fila')).filter(a => a.ativo == true);
    return dados;
  }

  public delete(id: string) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    var dado = dados.find(a => a.id == id);
    dados = dados.filter(a => a.id != id);
    
    dado.ativo = false
    
    dados.push(dado)

    this.updateLocalStorage(dados)
  }

  public create(triagem: ProntuarioModel, editar: boolean) {
    var dados = JSON.parse(localStorage.getItem('db_fila'));

    if (!editar) {
      dados.push(triagem)
    }
    else {
      dados = dados.filter(a => a.id !== triagem.id)

      dados.push(triagem)
    }

    this.updateLocalStorage(dados)
  }

  updateLocalStorage(db) {
    // Atualiza dados LocalStorge
    localStorage.setItem('db_fila', JSON.stringify(db));
  }

  public buscarPaciente(cpf: string): CadastroPacienteModel{
    return JSON.parse(localStorage.getItem('db_paciente')).find(a => a.cpf === cpf);
  }

  public buscarProntuario(id: string): CadastroPacienteModel{
    return JSON.parse(localStorage.getItem('db_fila')).find(a => a.id === id);
  }
}
