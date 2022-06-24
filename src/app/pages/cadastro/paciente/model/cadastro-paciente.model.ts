export interface CadastroPacienteModel {
  nome: string,
  email: string,
  dataNascimento: Date,
  genero: number,
  cpf: string,

  cep: string,
  logradouro: string,
  bairro: string,
  localidade: string,
  numero: number,
  uf: string,
  complemento: string,
}
