# cypress-data-cy-highlight

A chrome extension that highlights elements with the `data-cy` attribute. The elements can be exported to a file for further review. Data-cy is the default attribute to search for but users can enter a custom attribute to search for.

## Store Page:

[Chrome Web Store](https://chromewebstore.google.com/detail/cypress-data-cy-highlight/oladebhfebnknclflagfihgpooccclmo?authuser=1&hl=en)

## Loading the unpacked plugin (not from the store)

The unpacked plugin is located in the src folder

[chrome developer docs](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

Follow the instructions located at the above url. It's probably a good idea to read through that entire tutorial.

## Bundling the extension

Run:

```
npm run build
```

This will create a zip file named `extension.zip` in the root directory of the project. This zip file can be uploaded to the chrome web store for distribution.
