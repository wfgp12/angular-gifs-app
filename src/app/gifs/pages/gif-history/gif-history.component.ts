import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute} from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-gif-history',
  imports: [ListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifService = inject(GifsService);
  query = toSignal(inject(ActivatedRoute).params.pipe((map(params => params['query']))));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
