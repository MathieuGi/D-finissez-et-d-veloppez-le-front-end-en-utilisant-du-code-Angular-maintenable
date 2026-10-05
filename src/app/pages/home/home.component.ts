import { Component, computed, effect, inject } from '@angular/core';
import { CountryService } from '../../standalones/bar-chart/services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  countryService: CountryService = inject(CountryService);
  spinner: NgxSpinnerService = inject(NgxSpinnerService);

  countries = rxResource({
    stream: () => this.countryService.getCountries(),
  });
  isLoading = computed<boolean>(() => this.countries.status() === 'loading');
  hasError = computed<boolean>(() => this.countries.status() === 'error');
  errorMessage = computed<string>(
    () => this.countries.error()?.message || 'An error occure.',
  );

  constructor() {
    effect(() => {
      if (this.isLoading()) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
