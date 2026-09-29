import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Country } from '../models/country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getCountries = (): Observable<Country[]> => {
    if (!this.loaded) {
      this.fetchCountries();
      this.loaded = true;
    }

    return this.countries;
  };

  getCountryById = (countryId: string): Observable<Country | undefined> => {
    if (!this.loaded) {
      this.fetchCountries();
      this.loaded = true;
    }

    return this.countries.pipe(
      map((countries: Country[]) =>
        countries.find((country) => country.id === parseInt(countryId)),
      ),
    );
  };

  private fetchCountries = () => {
    this.http
      .get<CountryDto[]>(this.olympicUrl)
      .pipe()
      .subscribe({
        next: (countriesDTO: CountryDto[]) => {
          if (countriesDTO && countriesDTO.length > 0) {
            const countries: Country[] = countriesDTO.map((value: CountryDto) =>
              Country.countryDtoToCountry(value),
            );

            this.countriesSubject.next(countries);
          }
        },
      });
  };
}
