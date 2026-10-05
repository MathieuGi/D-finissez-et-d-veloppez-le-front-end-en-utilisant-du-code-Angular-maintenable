import { Component, input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-page-title',
  styleUrl: './page-title.component.scss',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {
  title = input.required<string>();
}
