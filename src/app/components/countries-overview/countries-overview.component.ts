import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-countries-overview',
  templateUrl: './countries-overview.component.html',
  styleUrl: './countries-overview.component.scss',
})
export class CountriesOverviewComponent implements OnChanges {
  @Input() countries: Country[] = [];

  titlePage: string = 'Medals per Country';
  totalJOs: number = 0;
  countryNames: string[] = [];
  totalCountries: number = 0;
  sumOfAllMedalsYears: number[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.totalJOs = Array.from(
      new Set(
        this.countries
          .map((country: Country) =>
            country.participations.map(
              (participation: Participation) => participation.year,
            ),
          )
          .flat(),
      ),
    ).length;
    this.countryNames = this.countries.map(
      (country: Country) => country.country,
    );
    this.totalCountries = this.countryNames.length;
    this.sumOfAllMedalsYears = this.countries
      .map((country: Country) =>
        country.participations.map(
          (participation: Participation) => participation.medalsCount,
        ),
      )
      .map((medals: number[]) =>
        medals.reduce((acc: number, i: number) => acc + i, 0),
      );
  }

  onCountryClick = (index: number) => {
    const countryId: string = this.countryNames
      ? this.countries[index].id.toString()
      : '';
    this.router.navigate(['country', countryId]);
  };
}
