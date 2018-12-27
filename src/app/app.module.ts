import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { GenderAvatarPipe } from './shared/pipes/genderAvatar';
import { OrganismHeightPipe } from './shared/pipes/organismHeight';
import { OrganismWeightPipe } from './shared/pipes/organismWeight';

import { ApiService } from './services/api.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ListComponent,
		GenderAvatarPipe,
		OrganismHeightPipe,
		OrganismWeightPipe,
	],
	imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule, HttpModule],
	providers: [ApiService],
	bootstrap: [AppComponent]
})
export class AppModule {}
