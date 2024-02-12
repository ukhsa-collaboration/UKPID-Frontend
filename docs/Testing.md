# Testing

## Web Components

Testing Web Components such as those provided by Fluent UI can be quite tricky. This is ultimately down to the complications of working with the Shadow DOM that these web components make use of, and how the components output on the page.

For example, this markup for a `<fluent-select>` and `<fluent-option>` component:

```html
<fluent-select>
  <fluent-option value="system"> Use system setting </fluent-option>
  <fluent-option value="light"> Light </fluent-option>
  <fluent-option value="dark"> Dark </fluent-option>
</fluent-select>
```

will ultimately be outputted without the value attributes. WDIO [recommends querying elements by the text within them](https://webdriver.io/docs/selectors), but this isn't supported when querying elements inside a ShadowRoot. The value attribute is removed, so it's also not possible to query that. Your mileage will vary, not all components act this way (it's perfectly possible to select a fluent-button by its text, e.g. `await $('fluent-button=Click Me');`), but you'll probably need to use custom data attributes to select these components (e.g. `data-test="light"`);

## Page Object Pattern

You should follow the [Page Object Pattern](https://webdriver.io/docs/pageobjects) when writing your tests. In a nutshell, for each screen of the application, create a class which inherits a parent Screen class, then define your selectors as getter functions. You can also keep useful methods related to the screen in the class, such as a method that will navigate to the screen.

This pattern encourages re-usability and helps to keep your tests clean and organised.
