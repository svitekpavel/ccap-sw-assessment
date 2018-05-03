# Report

## Time

I use WakaTime to track time on code projects. According to the report I spent 34.5 hours on this project.

## Notes on Specific Methods

### Organism Storage

I wanted to reduce the number of API calls made and improve the speed of searches and filtering. Once the API service retrieves the Organisms from the API, they are stored in the allPeopleSubject. The allPeopleSubject is used for all filtering and searching. This way the API is only called once each time the page loads. 

### Search

Search is executed on button click (though I initially missed the button and had it set up to search as the user typed) and filters down the allPeopleSubject observable before creating a new observable from the results of the filter. The list component takes the output of that observable and passes it to a function to apply the filter streams. The search function is debounced to half a second to prevent rapid clicks on the search button from launching multiple searches.

### Filter

The filter function combines 6 Behavior Subjects that keep track of the true/false state for all filter values. The 'active' values are zipped together into one stream that is then passed on to be applied to the people stream. The stream is filtered once for each filter property. The remaining people are passed back to the UI.

### Filter UI

I wanted the filters to be as usable as they could be in the list form. Selected filter values float to the top of the filter list and remain visible even when the category loses focus. This way a user can easily distinguish what filters are applied and can remove them in fewer clicks.

## Plans for Improvement

### Pagination

I can implement pagination by grouping the Organisms returned by the search and filter functions using the rxjs bufferWithCount method and then reducing the buffers returned into an array keyed with a page number. The pagination controls would select a buffer to display on the page.

### Speed and Growth

My current implementation returns all of the Organisms in the first call and concatenates the pages returned by the API into one collection before sending it to the UI. The user would see results faster, and I would future-proof against a larger data set, if I refactor my API Service to return Organisms as soon as they're available.

### Better Filter UI

I'd really like to improve on the filters by creating some easier to use controls such as a range slider for the height and mass fields. That would allow users to more easily narrow their search. I'd also like to add a count to the filter to show how many Organisms are associated with each filter/filter value.

### Accessibility

Before moving beyond MVP stage I'd go through the UI, clean it up, and use more semantic elements for the layout with the appropriate aria properties to make the page more accesible.

### Component Splitting and Refactoring

There are a few pieces in the filters that could be refactored down into more re-usable components. The filter and serch components could also be moved into separate components.

### RXJS Refactoring

I'm almost certain there are cleaner ways to set up my observables and observers. Through the process so far I have already refactored several pieces to clean things up a bit. As I continue to work with RXJS I have no doubt I will be able to improve the patterns here.

### Better Testing

The unit tests I have now cover basic functionality. As I gain some more experience with RXJS and Jasmine I'm going to look to add better code coverage.