import { Injectable } from '@angular/core';
import { CadastroPacienteModel } from './model/cadastro-paciente.model';
import { ProntuarioModel } from './model/prontuario.model';

@Injectable({
  providedIn: 'root',
})
export class CadastroPacienteService {
  public salvarLocalStorage() {

    // colocar pacientes prévios
    let db_paciente = [];

    var db = JSON.parse(localStorage.getItem('db_paciente'));

    if (!db) {
      db = db_paciente;
      this.updateLocalStorage(db)
    }
  }

  public carregarListaPaciente(): CadastroPacienteModel[] {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));
    return dados;
  }

  public delete(cpf: string) {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));

    dados = dados.filter(a => a.cpf != cpf);

    this.updateLocalStorage(dados)
  }

  public create(cadastro: CadastroPacienteModel, editar: boolean) {
    var dados = JSON.parse(localStorage.getItem('db_paciente'));

    if (!editar) {
      dados.push(cadastro)
    }
    else {
      dados = dados.filter(a => a.cpf !== cadastro.cpf)

      dados.push(cadastro)
    }

    this.updateLocalStorage(dados)
  }

  updateLocalStorage(db) {
    // Atualiza dados LocalStorge
    localStorage.setItem('db_paciente', JSON.stringify(db));
  }

  public carregarProntuarios(cpf: string): ProntuarioModel[] {
    var dados = JSON.parse(localStorage.getItem('db_fila')).filter(a => a.cpf == cpf && a.ativo == false);
    return dados;
  }
  
  public buscarProntuario(id: string): CadastroPacienteModel{
    return JSON.parse(localStorage.getItem('db_fila')).find(a => a.id === id);
  }
}
