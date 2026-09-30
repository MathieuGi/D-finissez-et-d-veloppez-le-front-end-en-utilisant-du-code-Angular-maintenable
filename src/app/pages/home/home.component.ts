import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  countries$: Observable<Country[]> = this.countryService.getCountries();

  constructor(private countryService: CountryService) {}
}
