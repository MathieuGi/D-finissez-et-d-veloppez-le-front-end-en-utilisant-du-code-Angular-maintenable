import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';
import { Participation } from '../../models/participation';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  standalone: false,
})
export class CountryComponent implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private countryService: CountryService = inject(CountryService);

  titlePage = signal<string>('');
  totalEntries = signal<number>(0);
  totalMedals = signal<number>(0);
  totalAthletes = signal<number>(0);
  years = signal<number[]>([]);
  medals = signal<string[]>([]);

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
    this.totalEntries.set(participations?.length ?? 0);
  };

  private getTotalMedals = () => {
    this.totalMedals.set(
      this.medals().reduce(
        (accumulator: number, item: string) => accumulator + parseInt(item),
        0,
      ),
    );
  };

  private getTotalAthletes = (country: Country) => {
    const nbAthletes =
      country.participations.map(
        (participation: Participation) => participation.athleteCount,
      ) ?? [];
    this.totalAthletes.set(
      nbAthletes.reduce(
        (accumulator: number, item: number) => accumulator + item,
        0,
      ),
    );
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
