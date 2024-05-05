import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  async doLogin() {
    try {
      const result = await this.authService.signInWithGoogle();
      console.log('Usuário logado com sucesso:', result);

      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('Erro ao logar:', error);
    }
  }
}

