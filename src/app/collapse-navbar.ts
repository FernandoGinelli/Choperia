import { Component,HostListener, OnInit} from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { remult, UserInfo } from 'remult';
import { User } from 'src/shared/Users';
import { Caixa } from 'src/shared/caixa';
import { Cozinheiro } from 'src/shared/cozinheiro';
import { Fiscal } from 'src/shared/fiscalentrada';
import { FiscalSelf } from 'src/shared/fiscalself';
import { Repositor } from 'src/shared/repositor';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'ngbd-collapse-navbar',
	standalone: true,
	imports: [NgbCollapseModule, RouterLink,CommonModule],
	templateUrl: 'collapse-navbar.html',
})
export class NgbdCollapseNavbar implements OnInit{

  permissaoCaixa = remult.repo(Caixa);
  permissaoFiscal = remult.repo(Fiscal);
  permissaoRepositor = remult.repo(Repositor);
  permissaoCozinheiro = remult.repo(Cozinheiro);
  permissaoFiscalSelf = remult.repo(FiscalSelf);


  constructor(private http: HttpClient,private router: Router) {}

   isDropdownOpen = false;

   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownElement = document.getElementById('produtosDropdown');

    if (!dropdownElement?.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

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

    this.router.navigate(['/']);


  }



  ngOnInit(): void {
    this.http
    .get<User>('/api/currentUser')
    .subscribe((user) => (this.remult.user = user));
}


}
