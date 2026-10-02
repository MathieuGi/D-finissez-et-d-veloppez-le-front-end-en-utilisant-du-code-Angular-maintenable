import { Component, computed, input } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../models/country';
import { Participation } from '../../models/participation';

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
  totalJOs = computed<number>(() => this.computeTotalJos(this.countries()));
  countryNames = computed<string[]>(() =>
    this.computeCountryName(this.countries()),
  );
  totalCountries = computed<number>(() => this.countryNames().length);
  sumOfAllMedalsYears = computed<number[]>(() =>
    this.computeSumOfAllMedalsYears(this.countries()),
  );

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
    return countries
      .map((country: Country) =>
        country.participations.map(
          (participation: Participation) => participation.medalsCount,
        ),
      )
      .map((medals: number[]) =>
        medals.reduce((acc: number, i: number) => acc + i, 0),
      );
  }
}
