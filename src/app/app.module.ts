import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';

import { ApiService } from './services/api.service';
import { PeopleService } from './services/people.service';
import { GalacticYearPipe } from './shared/pipes/galactic-year.pipe';
import { GenderPipe } from './shared/pipes/gender.pipe';
import { UnitsPipe } from './shared/pipes/units.pipe';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ListComponent,
		UnitsPipe,
		GenderPipe,
		GalacticYearPipe
	],
	imports: [BrowserModule, CommonModule, HttpClientModule, HttpModule],
	providers: [ApiService, PeopleService],
	bootstrap: [AppComponent]
})
export class AppModule {}
