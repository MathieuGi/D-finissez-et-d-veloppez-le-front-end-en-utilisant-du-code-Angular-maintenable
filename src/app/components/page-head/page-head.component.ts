import { Component, input } from '@angular/core';
import { Indicator } from '../../models/indicator';

@Component({
  standalone: false,
  selector: 'app-page-head',
  styleUrl: './page-head.component.scss',
  templateUrl: './page-head.component.html',
})
export class PageHeadComponent {
  title = input.required<string>();
  indicators = input.required<Indicator[]>();
}
