import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  countryService: CountryService = inject(CountryService);

  countries$: Observable<Country[]> = this.countryService.getCountries();
}
