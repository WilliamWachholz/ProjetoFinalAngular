import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {    
    this.usuarioService.GetAll().subscribe(result => { this.usuarios = result; }, error => console.log(error));
  }

}
