import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/consts';
import { CustomValidators } from 'src/app/consts/customer-validators';
import { CadastroPacienteService } from '../cadastro-paciente.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfilePacienteComponent implements OnInit {
  public cadastroForm: FormGroup;
  public routers: typeof routes = routes;
  public formErrors = {
    lastName: '',
    firstName: '',
    ssnKey: '',
    phone: '',
    email: '',
    ssn: '',
  };

  constructor(
    public service: CadastroPacienteService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  public onSubmit() {
    if (this.cadastroForm.valid) {
      this.cadastroForm.reset();
    }

    this.service.create(this.cadastroForm.value);

    this.router.navigate([this.routers.CADASTRO_PACIENTE_LISTA], {
      relativeTo: this.route,
    });
  }
  public buildForm() {

    // alterar aqui com as variáveis de paciente
    this.cadastroForm = this.fb.group({
     // id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required, CustomValidators.validateCharacters]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, CustomValidators.validatessn]],
      sexo: ['', [Validators.required]],
      endereço: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      cpf: ['', [Validators.required]],
    });
  }
}
