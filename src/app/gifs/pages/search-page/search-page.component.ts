import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.service';
import type { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent { 
  gifService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.loadSearchGifs(query)
      .subscribe((resp) => {
        this.gifs.set(resp);
      })
  }
}
