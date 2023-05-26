import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { remult, UserInfo } from 'remult';
import { User } from 'src/shared/Users';

@Component({
	selector: 'ngbd-collapse-navbar',
	standalone: true,
	imports: [NgbCollapseModule, RouterLink],
	templateUrl: 'collapse-navbar.html',
})
export class NgbdCollapseNavbar {

  constructor(private http: HttpClient) {}


  usersRepo = remult.repo(User);
  users: User[] = []
  private  = this.usersRepo.find().then((users) => (this.users = users));


  signInUsername = '';
  signInSenha = '';
  remult = remult;
  validUsers: UserInfo[] = [];
	// Step 1:
	// Create a property to track whether the menu is open.
	// Start with the menu collapsed so that it does not
	// appear initially when the page loads on a small screen!
	isMenuCollapsed = true;
  signOut() {
    this.http
      .post('/api/signOut', {})
      .subscribe(() => (this.remult.user = undefined));
      this.private  = this.usersRepo.find().then((users) => (this.users = users));
  }

}
