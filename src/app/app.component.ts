import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicasComponent } from "./musicas/musicas.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MusicasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'musica-manager';
}
