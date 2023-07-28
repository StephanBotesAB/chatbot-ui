import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  onSubmit() {
    // handle login here
    console.log(`Username: ${this.username}, Password: ${this.password}`);
  }
}
