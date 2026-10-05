import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CountryService } from '../../standalones/bar-chart/services/country.service';
import { Country } from '../../models/country';
import { Participation } from '../../models/participation';
import { Indicator } from '../../models/indicator';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  standalone: false,
})
export class CountryComponent implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private countryService: CountryService = inject(CountryService);
  private router: Router = inject(Router);

  titlePage = signal<string>('');
  years = signal<number[]>([]);
  medals = signal<string[]>([]);

  indicators = signal<Indicator[]>([]);

  error!: string;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    let countryId: string | null = this.route.snapshot.paramMap.get('id');

    if (countryId) {
      const years = this.years;
      const medals = this.medals;

      this.countryService
        .getCountryById(countryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((country: Country | undefined) => {
          if (country) {
            this.titlePage.set(country.country);
            years.set(
              country.participations.map(
                (participation: Participation) => participation.year,
              ) ?? [],
            );

            medals.set(
              country.participations.map((participation: Participation) =>
                participation.medalsCount.toString(),
              ) ?? [],
            );

            this.getTotalEntries(country);
            this.getTotalMedals(country);
            this.getTotalAthletes(country);
          }
        });
    }
  }

  onBackHome() {
    this.router.navigate(['']);
  }

  private getTotalEntries = (country: Country) => {
    const participations =
      country.participations.map(
        (participation: Participation) => participation,
      )?.length || 0;

    this.indicators.set([
      ...this.indicators(),
      { name: 'Number of entries', value: participations },
    ]);
  };

  private getTotalMedals = (country: Country) => {
    this.indicators.update((indicators: Indicator[]) => [
      ...indicators,
      {
        name: 'Total Number of medals',
        value: country.getTotalMedals(),
      },
    ]);
  };

  private getTotalAthletes = (country: Country) => {
    const athleteCounts =
      country.participations.map(
        (participation: Participation) => participation.athleteCount,
      ) ?? [];

    const nbAthletes = athleteCounts.reduce(
      (accumulator: number, item: number) => accumulator + item,
      0,
    );

    this.indicators.update((indicators: Indicator[]) => [
      ...indicators,
      { name: 'Total Number of athletes', value: nbAthletes },
    ]);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
