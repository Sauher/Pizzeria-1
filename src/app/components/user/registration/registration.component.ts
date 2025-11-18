import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent {

  acceptTerms: boolean = false;

  newUser: User = {
    id:0,
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(
    private api: ApiService,
    private message: MessageService,
    private router: Router
  ) { }

  registration() {
    if (!this.acceptTerms) {
      this.message.show('danger', 'Hiba', 'El kell fogadnod a szabályzatot!');
      return;
    }

    this.api.registration('users', this.newUser).then(res => {
      if (res.status == 500){
        this.message.show('danger', 'Hiba', res.message);
        return;
      }
      this.message.show('success', 'Ok', res.message);
      this.router.navigate(['/login']);
    })
  }

}
