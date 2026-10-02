import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Country } from '../models/country';
import { HttpClient } from '@angular/common/http';
import { CountryDto } from '../models/country-dto';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private olympicUrl = './assets/mock/olympic.json';
  private countriesSubject = new BehaviorSubject<Country[]>([]);
  private countries: Observable<Country[]> =
    this.countriesSubject.asObservable();
  private loaded: boolean = false;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    if (!this.loaded) {
      this.fetchCountries();
      this.loaded = true;
    }

    return this.countries;
  }

  getCountryById(countryId: string): Observable<Country> {
    if (!this.loaded) {
      this.fetchCountries();
      this.loaded = true;
    }

    return this.countries.pipe(
      map((countries: Country[]) => {
        const country = countries.find(
          (country) => country.id === parseInt(countryId),
        );
        if (!country) {
          throwError(() => new Error('Country not found'));
        }

        return country as Country;
      }),
    );
  }

  fetchCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(this.olympicUrl).pipe(
      tap((countriesDTO: CountryDto[]) => {
        if (countriesDTO && countriesDTO.length > 0) {
          const countries: Country[] = countriesDTO.map((value: CountryDto) =>
            Country.countryDtoToCountry(value),
          );

          this.countriesSubject.next(countries);
          this.loaded = true;
        }
      }),
      catchError(() =>
        throwError(() => new Error('Failed to load the countries data')),
      ),
    );
  }
}
