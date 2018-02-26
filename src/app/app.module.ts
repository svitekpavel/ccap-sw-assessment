import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ListComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
