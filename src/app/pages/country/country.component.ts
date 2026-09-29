import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  titlePage: string = '';
  totalEntries: number = 0;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  years: number[] = [];
  medals: string[] = [];

  error!: string;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
  ) {}

  ngOnInit() {
    let countryId: string | null = this.route.snapshot.paramMap.get('id');

    if (countryId) {
      this.countryService
        .getCountryById(countryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((country: Country | undefined) => {
          if (country) {
            this.titlePage = country.country;
            this.years =
              country.participations.map(
                (participation: Participation) => participation.year,
              ) ?? [];
            this.medals =
              country.participations.map((participation: Participation) =>
                participation.medalsCount.toString(),
              ) ?? [];

            this.getTotalEntries(country);
            this.getTotalMedals();
            this.getTotalAthletes(country);
          }
        });
    }
  }

  private getTotalEntries = (country: Country) => {
    const participations = country.participations.map(
      (participation: Participation) => participation,
    );
    this.totalEntries = participations?.length ?? 0;
  };

  private getTotalMedals = () => {
    this.totalMedals = this.medals.reduce(
      (accumulator: number, item: string) => accumulator + parseInt(item),
      0,
    );
  };

  private getTotalAthletes = (country: Country) => {
    const nbAthletes =
      country.participations.map(
        (participation: Participation) => participation.athleteCount,
      ) ?? [];
    this.totalAthletes = nbAthletes.reduce(
      (accumulator: number, item: number) => accumulator + item,
      0,
    );
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
