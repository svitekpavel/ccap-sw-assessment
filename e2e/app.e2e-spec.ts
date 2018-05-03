import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('Find an Au Pair App', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it('should display loading message', () => {
		page.navigateTo();
		browser.pause();
		expect(page.getParagraphText()).toEqual('Welcome to app!');
	});
});
