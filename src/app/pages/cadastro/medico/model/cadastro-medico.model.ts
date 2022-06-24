export interface CadastroMedicoModel {
  nome: string,
  email: string,
  dataNascimento: Date,
  genero: number,
  registroProfissional: string,

  cep: string,
  logradouro: string,
  bairro: string,
  localidade: string,
  numero: number,
  uf: string,
  complemento: string,
}
