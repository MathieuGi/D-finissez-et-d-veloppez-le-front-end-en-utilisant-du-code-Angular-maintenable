export interface CountryDto {
  id: number;
  country: string;
  participations: ParticipationDto[];
}

export interface ParticipationDto {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
