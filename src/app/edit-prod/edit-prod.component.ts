import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent implements OnInit{
  @Input() cliente!: Produtos;
  userRepo = remult.repo(Produtos);


  constructor(private router: Router) {}


async saveProdutos(produtos: Produtos) {
  try {
    await this.userRepo.save(produtos)
    this.router.navigate(['/products']);
  } catch (error: any) {
    alert(error.message)
  }
}
  ngOnInit(): void {
    this.cliente = history.state.cliente;
  }

}
