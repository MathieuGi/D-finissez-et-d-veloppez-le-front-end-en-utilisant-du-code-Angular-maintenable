import { Component, computed, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../models/country';
import { Participation } from '../../models/participation';
import { Indicator } from '../../models/indicator';

// QUESTION : Mes fonctions pourraient elles faire appel directement à this.countries() ?

@Component({
  selector: 'app-countries-overview',
  templateUrl: './countries-overview.component.html',
  styleUrl: './countries-overview.component.scss',
  standalone: false,
})
export class CountriesOverviewComponent {
  countries = input.required<Country[]>();

  titlePage: string = 'Medals per Country';
  countryNames = computed<string[]>(() =>
    this.computeCountryName(this.countries()),
  );
  sumOfAllMedalsYears = computed<number[]>(() =>
    this.computeSumOfAllMedalsYears(this.countries()),
  );

  indicators = computed<Indicator[]>(() => {
    const totalCountries = this.countryNames().length;
    const totalJOs = this.computeTotalJos(this.countries());
    return [
      {
        name: 'Number of countries',
        value: totalCountries,
      },
      {
        name: 'Number of JOs',
        value: totalJOs,
      },
    ];
  });

  constructor(private router: Router) {}

  onCountryClick = (index: number) => {
    const countryId: string = this.countryNames()
      ? this.countries()[index].id.toString()
      : '';
    this.router.navigate(['country', countryId]);
  };

  private computeTotalJos(countries: Country[]) {
    return Array.from(
      new Set(
        countries
          .map((country: Country) =>
            country.participations.map(
              (participation: Participation) => participation.year,
            ),
          )
          .flat(),
      ),
    ).length;
  }

  private computeCountryName(countries: Country[]) {
    return countries.map((country: Country) => country.country);
  }

  private computeSumOfAllMedalsYears(countries: Country[]): number[] {
    return countries.map((country: Country) => country.getTotalMedals());
  }
}
