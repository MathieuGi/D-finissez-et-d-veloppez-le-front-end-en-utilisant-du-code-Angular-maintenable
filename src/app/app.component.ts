import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  resource,
} from '@angular/core';
import { CountryService } from './standalones/bar-chart/services/country.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'Olympic games app !';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.fetchCountries().pipe(first()).subscribe();
  }
}
