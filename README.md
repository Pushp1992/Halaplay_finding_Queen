* This repository is meant for HALAPLAY - Finding Queen Application.

Runs the app in the development mode.<br>
Open [http://localhost:7000](http://localhost:7000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

* It inlcudes features like:
1. Selecting Planets
2. Selecting Vehicles
3. Resetting all the input fields
4. Routing from one view to another view
5. Error handling
6. API service call using axios
7. await/async

* Setup: Procedure:
* Checkout the master branch of the repository.
* Install the npm module required for the project.
* npm install

* In case of any concern, you can send your query to pushp.ranjansingh@gmail.com

# To install all modules
___
Run npm install

# On missing module dependencies
___

Run `npm install`

# To install nodemon plugin for development
___

# Please create blank .env file in the project root directory

Run `npm install -g nodemon`

# On developement machine:

Execute the following command to run the application (client + server)
`npm run dev`
___

Run below command to start only client:
`npm run start`
`client will run on the port 7000`

Run below command to start only server:
`npm run server`
`server will run on the port 5000`

On prod machine:
 Run the following command

`npm run prod`

# Server is created to handle the browser's CORS issue while making API calls for the HALAPLAY services


# Config changes
___

URL configs are available in

Config Folder: `server/config/url`

PROD config:
`server/config/url/prod.config.js`

DEV config:
`Create a .env file in the root directory of the project. Add environment-specific variables on new lines in the form of NAME=VALUE`
`Use PROD config mentioned above for reference or you can leave it blank for the time being if you do not have any hard core dependency` 

___


