Welcome to my version of the challenge.

All requirements have been met, and some extra details have been considered and accounted for. I look forward to discussing the approach.

### Some known issues

1. The data in the table has no format.

   <b>Potential solution:</b>

   a) Add a formatter function prop to the result-table that will be ran before using the data to create the table. The constraint here is that we don't know the fields in advanced, so we can't (cleanly) leverage the data grid config object for that formatting.

2. Fields with objects or arrays as values in the data fetched will not show up properly in the table. Parsing the data received becomes necessary for this.

   <b>Potential solution:</b>

   a) For arrays - Join their values and show them as comma separated.

   b) For objects - Approach 1: flatten the response so that all objects within become a set of primitive fields. Approach 2: Show grouped columns in the table and grouped fields in the condition field dropdown.

### Enhancements for a production version

1. Unit tests and integration tests.

2. The ability to delete all conditions at once.

3. The ability to click on the "Total" and "Filtered" chips above the table to toggle what the Results table show.

4. Refactor note: parametrize the operators in the condition-builder component so that any host of the component can change the operators shown. This includes allowing the ability to pass another version of the comparisonFunctions that matches the new operators. All that should be supported by finishing the abstraction of operators and comparisonFunctions (the foundation is laid).

## Running the app

On the base folder, run

`npm i` and then `npm start`.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

###

_This app was created using Node v21.7.1 and npm v10.5.0._
