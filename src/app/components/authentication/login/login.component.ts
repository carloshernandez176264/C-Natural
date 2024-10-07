import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/common/userdto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

import * as M from 'materialize-css';
import Swal from 'sweetalert2';
import { UserType } from 'src/app/common/user-type';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username : string = '';
  password : string = '';

  
  name: string = '';
  surname: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';  
  userType: string = '';
  confirmPassword: string = '';


  constructor(
    private authentication : AuthenticationService,
    private sessionStorage : SessionStorageService,
    private router : Router
  ){}
  ngOnInit(): void {
    // Inicializar el modal
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  login(){
    let userdto = new Userdto(this.username, this.password);
    this.authentication.login(userdto).subscribe(
      token => {
        this.sessionStorage.setItem('token', token);
        if(token.type == 'ADMIN'){
          this.router.navigate(['/admin/product']);
        }else{
          this.router.navigate(['/']);
        }
      }
    )
  }

  register() {
    
    // Validaciones previas al registro
    if (!this.name || !this.surname || !this.email || !this.password || !this.address || !this.cellphone || !this.confirmPassword) {
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

  // Validar coincidencia de contraseñas
  if (this.password !== this.confirmPassword) {
      Swal.fire({
          icon: 'error',
          title: 'Contraseñas no coinciden',
          text: 'Por favor, asegúrate de que las contraseñas coincidan.'
      });
      return;
  }

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

    // Validar el formulario antes de proceder con el registro
    if (!this.validateForm()) {
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
}

validateForm(): boolean {
    // Validaciones previas al registro
    if (!this.name || !this.surname || !this.email || !this.password || !this.address || !this.cellphone) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos obligatorios.'
        });
        return false;
    }

    // Validar formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo no válido',
            text: 'Por favor, ingresa un correo electrónico válido.'
        });
        return false;
    }

    // Validar longitud de la contraseña
    if (this.password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña no válida',
            text: 'La contraseña debe tener al menos 8 caracteres.'
        });
        return false;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Las contraseñas ingresadas no coinciden. Verifícalas e inténtalo nuevamente.'
        });
        return false;
    }

    return true;  // Todas las validaciones pasaron
}



}
