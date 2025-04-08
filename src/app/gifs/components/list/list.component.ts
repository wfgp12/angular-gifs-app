import { Component, input } from '@angular/core';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'gifs-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  gifs = input.required<string[]>();

 }
