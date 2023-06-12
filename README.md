# This is the frontend for the Library Application


## To run this frontend pls:
    - have node.js and npm installed (check with 'node -v' and 'npm -v')
    - run 'npm install' in  root folder (.../LibraryFrontend)
    - run 'ng serve' in  root folder (.../LibraryFrontend)

## Default port for frontend: 'localhost:4200'
    -  this can be changed in the angular.json file by adding '"port": 4201' in the options section

## The Backend has to run on localhost:8080 so the services can access the backend
    - this can be changed in the Services (.../src/app/services)
      - in 'author.service.ts, book.service.ts and rental.service.ts change the variables 'apiUrlAll' and 'apiUrlOne'


