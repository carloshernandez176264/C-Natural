import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserType } from 'src/app/common/user-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';
  password: string = '';
  userType: string = '';

  ngOnInit(): void {}

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  register() {
    // Asignar el nombre de usuario como el correo electrónico y el tipo de usuario
    this.username = this.email;
    this.userType = UserType.CUSTOMER;

    // Crear el objeto User
    const user = new User(
      0, 
      this.username, 
      this.name, 
      this.surname, 
      this.email, 
      this.address, 
      this.cellphone, 
      this.password, 
      this.userType
    );

    // Validaciones previas al registro
    if (!this.name || !this.surname || !this.email || !this.password || !this.address || !this.cellphone) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.'
        });
        return;
    }

    // Validar formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo no válido',
            text: 'Por favor, ingresa un correo electrónico válido.'
        });
        return;
    }

    // Validar longitud de la contraseña
    if (this.password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña no válida',
            text: 'La contraseña debe tener al menos 8 caracteres.'
        });
        return;
    }

    // Llamar al servicio de autenticación para registrar el usuario
    this.authentication.register(user).subscribe(
      (response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario se ha registrado exitosamente.'
        }).then(() => {
          // Redirigir al usuario a la página de login después de la confirmación
          this.router.navigate(['user/login']);
        });

        console.log(response);  // Mostrar respuesta en consola
      },
      (error) => {
        // Manejar errores y mostrar el mensaje correspondiente
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un problema al registrar el usuario. Por favor, inténtelo nuevamente.'
        });
        console.log(error);  // Mostrar error en consola
      }
    );

    // Mostrar los datos del usuario en consola (opcional)
    console.log(user);
}

}
