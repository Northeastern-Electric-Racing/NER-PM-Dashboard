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
  // console.log('covid form id: ' + scriptProps.getProperty('covidFabForm'));
  // console.log('change form id: ' + scriptProps.getProperty('changeForm'));
  var form = FormApp.openById(scriptProps.getProperty('fabForm'));
  var responses = form.getResponses();
  var latestResponse = responses[responses.length - 1];
  var responseData = latestResponse.getItemResponses();
  responseData = responseData.map(ele => ele.getResponse()); // convert items to item responses
  // var requestId = getNextChangeRequestId(responseData.splice(2, 1)[0]); // convert request type to id num
  var requestId = getNextCovidRequestId();
  responseData.unshift(requestId, latestResponse.getTimestamp()); // add id num and timestamp to front of array
  var sheet = getSheetInfo(MAIN_SHEET_ID_STR, FAB_WELD_STR, SHEET_STR);
  sheet.appendRow(responseData);
}

/**
 * Increments and returns the next COVID manufacturing request ID.
 *
 * @returns {number} – The next COVID manufacturing request ID
 */
function getNextCovidRequestId() {
  const sheet = getSheetInfo(MAIN_SHEET_ID_STR, SETTINGS_STR, SHEET_STR);
  let cell = sheet.getRange(7, 2);
  let nextId = cell.getValue() + 1;
  cell.setValue(nextId);
  return nextId;
}
