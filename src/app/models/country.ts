import { CountryDto, ParticipationDto } from './country-dto';
import { Participation } from './participation';

export class Country {
  id: number;
  country: string;
  participations: Participation[] = [];

  constructor(id: number, country: string) {
    this.id = id;
    this.country = country;
  }

  addParticipation(participation: Participation) {
    this.participations.push(participation);
  }

  static countryDtoToCountry(countryDTO: CountryDto) {
    const country: Country = new Country(countryDTO.id, countryDTO.country);

    countryDTO.participations.map((participationDTO: ParticipationDto) => {
      country.participations.push(
        new Participation(
          participationDTO.id,
          participationDTO.year,
          participationDTO.city,
          participationDTO.medalsCount,
          participationDTO.athleteCount,
        ),
      );
    });

    return country;
  }
}
