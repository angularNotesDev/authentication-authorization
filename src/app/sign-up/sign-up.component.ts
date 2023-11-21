import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  routherService = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.authService.signUpUser(this.form.getRawValue()).subscribe((response) => {
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSignal.set(response.user);
      this.routherService.navigateByUrl('/user-info');
    });
  }
}
