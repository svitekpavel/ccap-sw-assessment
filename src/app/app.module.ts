import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './+header/header.component';
import { ListComponent } from './+list/list.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ListComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpModule,
	],
	entryComponents: [AppComponent],
	bootstrap: [AppComponent],
})
export class AppModule {
}
