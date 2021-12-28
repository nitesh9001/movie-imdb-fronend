# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To setup and run project

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## To build this app for deployed run cmd 
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Deployment

This is deployed on Netlify with CI/CD 

### Functionlity

1. Fetch movies data as guest user - without login
2. You can filter data based on genre type 
3. You can sort data based on - createdAt(By default) , title, director name, reelease year, rating .[Make use of ascending /descending button given side of select to sort a/c]- use clear button to reste search of filter or sorting
4. You can search movies name or director name to get movies
5. You will be able to view details page as guest user / logged user
6. login / Singup/logut functional(JWT token)
7. To add movies / edit/ delete/ uodate you must be loggedin (added aws s3 bucket support for fast rendering of images )
8. You will be only able to edit or change or delete your data not other's added 
9. As loged in user or huest user you can add or remove watch later list
