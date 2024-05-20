Welcome to my version of the challenge.

All requirements have been met, and some extra details have been considered and accounted for. I look forward to discussing the approach.

## Running the app

On the base folder, run

`npm i` and then `npm start`.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Enhancements for a production version

1. Unit tests and integration tests.

2. The ability to delete all conditions at once.

3. The ability to click on the "Total" and "Filtered" chips above the table to toggle what the Results table show.

4. Refactor opportunities:

   a) Right now, passing a different set of operators to the condition builder component forces the host component to pass a new implementation of the datasetFilter function. Ideally, we should be able to change the operator list without having to change our version of the datasetFilter function. In short, the default operators and the datasetFilter function need decoupling.

   b) We need better safe typing for the comparison functions. This could be achieved by dynamically basing the comparison functions type on the operators being passed.

## Some known issues

#### Not covered by the requirements

1. Fields with objects or arrays as values in the data fetched will not show up properly in the table. Parsing the data received becomes necessary for this.

   <b>Potential solution:</b>

   a) For arrays - Join their values and show them as comma separated.

   b) For objects - <br>
   Approach 1: flatten the response so that all objects within become a set of primitive fields.<br>
   Approach 2: Show grouped columns in the table and grouped fields in the condition field dropdown.

###

_This app was created using Node v21.7.1 and npm v10.5.0._
