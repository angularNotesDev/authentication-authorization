import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styles: ['.spacer {flex: 1 1 auto;}'] // just a class to push buttons to the right
})
export class AppComponent implements OnInit {

  auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.auth.currentUserSignal.set(user.user);
    });
  }

  logOut() {
    this.auth.logOutUser();
  }
}
