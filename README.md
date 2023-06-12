# Library Application Frontend

This repository contains the frontend code for the Library Application.

## Prerequisites
Before running the frontend, ensure that you have the following software installed:
- Node.js: To check if Node.js is installed, run the command `node -v` in the terminal.
- npm (Node Package Manager): To check if npm is installed, run the command `npm -v` in the terminal.

## Getting Started
To run the frontend, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the root folder of the frontend project.

3. Install the project dependencies by running the following command: `npm install`
4. Start the development server by running the following command: `ng serve`

5. Open your web browser and visit `http://localhost:4200` to access the Library Application.

## Customizing the Port
By default, the frontend runs on `localhost:4200`. If you want to change the port, you can modify the `angular.json` file. Follow these steps:

1. Locate the `angular.json` file in the root folder of the frontend project.
2. In the `"serve" -> "options"` section, add the following line: `"port": 4201`
  - Replace 4201 with your desired port number.

## Backend Configuration
The frontend relies on the backend running on `localhost:8080`. If you need to change the backend URL, follow these steps:

1. Open the relevant service files located in the `src/app/services` directory:
- `author.service.ts`
- `book.service.ts`
- `rental.service.ts`
2. Update the `apiUrlAll` and `apiUrlOne` variables in each service file to the desired backend URL.
