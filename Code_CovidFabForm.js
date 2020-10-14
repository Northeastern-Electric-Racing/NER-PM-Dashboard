/*
Document: JS code connecting the COVID Fab form to the spreadsheet
*/



// var counter = getNextCovidRequestId();

/**
 * Pulls the most recent COVID manufacturing request and places it in the PM 21 spreadsheet.
 *
 * @return {void}
 */
function onCovidRequestSubmit() {
  var form = FormApp.openById(scriptProps.getProperty('covidFabForm'));
  var responses = form.getResponses();
  var latestResponse = responses[responses.length - 1];
  var responseData = latestResponse.getItemResponses();
  responseData = responseData.map(ele => ele.getResponse()); // convert items to item responses
  // var requestId = getNextChangeRequestId(responseData.splice(2, 1)[0]); // convert request type to id num
  var requestId = counter.increment(); // convert request type to id num
  responseData.unshift(requestId, latestResponse.getTimestamp()); // add id num and timestamp to front of array
  var sheet = getSheetInfo('mainSheetID', 'Fab & Weld', 'sheet');
  sheet.appendRow(responseData);
}

/**
 * Increments and returns the counter used for the next COVID manufacturing request ID.
 *
 * @type {{increment: (function(): number)}}
 */
var counter = (function() {
  var counter = 0;

  return {
    increment: function() {
      return ++counter;
    }
  };
})();
