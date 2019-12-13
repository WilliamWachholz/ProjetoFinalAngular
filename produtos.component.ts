import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  registroSalvo = false;
  produtoForm: any;
  allProdutos: Produto[];
  idProdutoAtualizado = null;
  mensagem = null;

  usuario: any;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));

    this.produtoForm = this.formBuilder.group({
      Nome: ['', [Validators.required]],
      DataCriacao: ['', [Validators.required]],
      Tipo: ['', [Validators.required]],
      EmEstoque: ['', [Validators.required]],
      Reservado: ['', [Validators.required]],
      Disponivel: ['', [Validators.required]],
    });

    this.GetAllProdutos();
  }

  GetAllProdutos() {
    this.produtoService.GetAll().subscribe(result => { this.allProdutos = result; },
      error => console.log(error));
  }

  CarregarProduto(id: number) {
    this.produtoService.getProdutosById(id).subscribe(result => {
      this.mensagem = null;
      this.registroSalvo = false;
      this.idProdutoAtualizado = result.id;
      this.produtoForm.controls['Nome'].setValue(result.nome);
      this.produtoForm.controls['DataCriacao'].setValue(result.dataCriacao);
      this.produtoForm.controls['Tipo'].setValue(result.tipo);
      this.produtoForm.controls['EmEstoque'].setValue(result.emEstoque);
      this.produtoForm.controls['Reservado'].setValue(result.reservado);
      this.produtoForm.controls['Disponivel'].setValue(result.disponivel);
    })
  }

  SalvarProduto(produto: Produto) {
    if (this.idProdutoAtualizado == null) {
      this.produtoService.createProduto(produto).subscribe(
        () => {
          this.registroSalvo = true;
          this.mensagem = 'Produto inserido com sucesso';
          this.GetAllProdutos();
          this.idProdutoAtualizado = null;
          this.produtoForm.reset();
        }
      );
    }
    else {
      this.produtoService.updateProduto(produto).subscribe(
        () => {
          this.registroSalvo = true;
          this.mensagem = "Produto atualizado com sucesso";
          this.GetAllProdutos();
          this.idProdutoAtualizado = null;
          this.produtoForm.reset();
        }
      );
    }
  }

  DeletarProduto(id: number) {
    if (confirm("Essa operação é irreversível. Tem certeza que deseja continuar?")) {
      this.produtoService.deleteProduto(id).subscribe(
        () => {
          this.registroSalvo = true;
          this.mensagem = "Produto excluído com sucesso";
          this.GetAllProdutos();
          this.idProdutoAtualizado = true;
          this.produtoForm.reset();
        }
      );
    }
  }

  onFormSubmit() {
    this.registroSalvo = false;
    const produto = this.produtoForm.value;
    this.SalvarProduto(produto);
    this.produtoForm.reset();
  }

  resetForm() {
    this.produtoForm.reset();
    this.mensagem = null;
    this.registroSalvo = false;
  }
}
