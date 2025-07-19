# cypress-data-cy-highlight

<img width="317" height="319" alt="image" src="https://github.com/user-attachments/assets/eb30f901-c672-48af-8ccf-a8ff56c5ac48" />
<img width="400" height="259" alt="image" src="https://github.com/user-attachments/assets/ac5aeef8-043d-4d4f-ae8d-d654b4906ed7" />




A chrome extension that highlights elements with the `data-cy` attribute. The elements can be exported to a file for further review. Data-cy is the default attribute to search for but users can enter a custom attribute to search for.

## Store Page:

[Chrome Web Store](https://chromewebstore.google.com/detail/cypress-data-cy-highlight/oladebhfebnknclflagfihgpooccclmo?authuser=1&hl=en)

## Loading the unpacked plugin (not from the store)

The unpacked plugin is located in the src folder

[chrome developer docs](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

Follow the instructions located at the above url. It's probably a good idea to read through that entire tutorial.

## Development

Run the following after cloning this repository: 

```bash
npm ci
npm run build
npm run start
```

The plugin uses https://github.com/vercel/serve to host a sample site for testing the plugin. Navigate to localhost:3000 to load the custom site which has elements with a data-cy attribute. Then load the local copy of the plugin by:

In the address bar of chrome, navigate to: chrome://extensions/.
Click on "Load Unpacked"
<img width="167" height="104" alt="image" src="https://github.com/user-attachments/assets/cc625eb6-517b-4df9-a4bc-344f686d80a6" />
Select the `dist` folder which includes all the unpacked javascript resources.
<img width="484" height="251" alt="image" src="https://github.com/user-attachments/assets/3b510950-5f7f-4583-a5f0-88de8ff5cf9b" />

Open your chrome extension menu and interact with the cypress-data-cy-highlight extension. 


## Bundling the extension

Run:

```
npm run build
```

This will create a zip file named `extension.zip` in the root directory of the project. This zip file can be uploaded to the chrome web store for distribution.
