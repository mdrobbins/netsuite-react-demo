# Understanding the NetSuite React Demo

The purpose of this project is to demonstrate a clean project structure for developing NetSuite Suitelets using React.

The idea is to be able to develop and test locally and still be easy to deploy and entire application including the compiled JavaScript and CSS assets as well as the NetSuite Script and Deployment records using the SuiteCloud Development Framework.

This provides a modern development experience and is also comfortable to traditional NetSuite developers.

## Local Development

To clone the project locally and install all JS dependencies:

```bash
git clone https://github.com/mdrobbins/netsuite-react-demo.git
cd netsuite-react-demo
npm install
```

To run the project locally for Development:

### Start the local API server

For local development, this project uses `json-server` and stores the data in the `data/db.json` file.  This allows for easy local development.

To start the API server:

```bash
npm run api-server
```

### Start the application

To start the development build of the application locally:

```bash
npm run start
```

Open your browser and navigate to `http://localhost:3000`.

## Deploying to Netsuite

This project assumes you have the SuiteCloud Development Framework CLI installed and configured.  Explaining how to use the CLI is beyond the scope of this project.

There are three `npm` scripts used to deploy this project to a Netsuite environment:

```bash
npm run build
```

The command creates a production build of the React application.  It uses `react-app-rewired` and the `config-overrides.js` file to prevent the native code-splitting in React apps to ensure the app builds as a single JavaScript file.  The NetSuite file cabinet doesn't act like a traditional file system so code-splitting doesn't work.

This command also builds the JS and CSS files without file hashes in the name.  This ensures the files have the same name after each build so deploying to NetSuite always overwrites the files already there.

```bash
npm run clean
```

This command move the production-built JS and CSS files from the build folder to the `FileCabinet/SuiteScripts/react-demo` folder the delets the `build` folder.  This colocates the JS and CSS files with the Suitelet and RESTlet files being deployed to NetSuite.

```bash
npm run deploy
```

This command runs `npm run build`, `npm run clean`, and uses SDF to run `suitecloud project:deploy`.

This command will deploy all of the files in the `FileCabinet/Suitescripts/react-demo` folder.  Then create or update the Suitelet and RESTlet script records in NetSuite.

Prior to running this command, you should have SDF configured to deploy to the NetSuite account of your choice with this command:

```bash
suitecloud account:setup
```

## Running the application in NetSuite

After deploying the application to NetSuite, you can launch the application by navigating to:

```aiignore
Setup > Customer > DataTek - NetSuite React Demo
```

## Explaining the Suitelet

The Suitelet does a few things which makes it straight-forward to deploy this app to any account and not worry about different IDs for scripts and media items.  This deploy works anywhere.

* Look up the URL for the API RESTlet.  Because the URL will be different in every environment, we perform the lookup here and write the API Endpoint to the `window` object so the React application can retrieve that value.
* Look up the URLs for the React JS and CSS files.  Again, these URL will be different in every NetSuite environment.
* Output a very simple HTML page with references to the React JS and CSS files.  

The browser does all the rest.

## Explaining the RESTlet

