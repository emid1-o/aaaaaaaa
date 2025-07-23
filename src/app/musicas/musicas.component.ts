import { Component, OnInit } from '@angular/core';
import { Musica } from '../models/musica';
import { MusicaService } from '../services/musica.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-musicas',
  standalone: true,                // ⬅️ IMPORTANTE para usar imports aqui
  imports: [CommonModule, FormsModule],
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.scss']  // plural e com colchetes
})
export class MusicasComponent implements OnInit {  // ⬅️ implements OnInit para usar ngOnInit

  musica: Musica = {
    nome: '',
    artista: '',
    genero: ''
  };

  musicas: Musica[] = [];

  constructor(private musicaService: MusicaService) { }

  ngOnInit(): void {
    this.carregarMusicas();
  }

  carregarMusicas() {
    this.musicaService.findAll().subscribe({
      next: data => {
        this.musicas = data;
      },
      error: err => {
        alert('Erro ao carregar músicas');
      }
    });
  }

  salvarMusica() {
    if (!this.musica.nome || !this.musica.artista || !this.musica.genero) {
      alert('Preencha todos os campos!');
      return;
    }

    this.musicaService.save(this.musica).subscribe({
      next: () => {

        Swal.fire({
          title: "Música salva",
          
          icon: "success"
        });

        this.musica = { nome: '', artista: '', genero: '' }; // limpa form
        this.carregarMusicas(); // atualiza a tabela
      },
      error: () => {
        console.error();
        alert('Erro ao salvar música');
      }
    });
  }

 
  deletarMusica(id: number | undefined): void {
  if (!id) return;

  if (confirm('Tem certeza que deseja excluir esta música?')) {
    this.musicaService.deleteById(id).subscribe({
      next: () => {
        alert('Música deletada com sucesso!');
        this.carregarMusicas();
      },
      error: err => {
        console.error(err);
        alert('Erro ao deletar música');
      }
    });
  }
}

}
