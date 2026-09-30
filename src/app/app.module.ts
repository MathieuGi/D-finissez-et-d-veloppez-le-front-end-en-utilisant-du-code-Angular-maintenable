import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from './pages/country/country.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChartIndicatorComponent } from './standalones/chart-indicator/chart-indicator.component';
import { PieChartComponent } from './standalones/pie-chart/pie-chart.component';
import { CountriesOverviewComponent } from './components/countries-overview/countries-overview.component';
import { BarChartComponent } from './standalones/bar-chart/bar-chart.component';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryComponent,
    HeaderComponent,
    FooterComponent,
    CountriesOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PieChartComponent,
    BarChartComponent,
    ChartIndicatorComponent,
    AsyncPipe,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
