/*
Document: JS code connecting the Change Management Request form to the spreadsheet

*/

// onRequestSubmit : n/a -> n/a
// Pull the new change request submitted to the form
function onRequestSubmit() {
    var form = FormApp.openById(scriptProps.getProperty('changeForm'));
    var responses = form.getResponses();
    var latestResponse = responses[responses.length - 1];
    var responseData = latestResponse.getItemResponses();
    responseData = responseData.map(ele => ele.getResponse()); // convert items to item responses
    var requestId = getNextChangeRequestId(responseData.splice(2, 1)[0]); // convert request type to id num
    responseData.unshift(requestId, latestResponse.getTimestamp()); // add id num and timestamp to front of array
    var sheet = getSheetInfo('mainSheetID', 'Change Requests', 'sheet');
    sheet.appendRow(responseData);
}

// getNextChangeRequestId : String -> String
// returns the next request ID for the given request type based on previous requests
function getNextChangeRequestId(requestType) {
    var typeLetter = convertToTypeLetter(requestType);
    var data = getSheetInfo('mainSheetID', 'Change Requests', 'data');
    var changeIdIdx = findIdx("ID", data[0]);
    var numRequests = data.length - 1;
    var latestId;
    for (var rowIdx = numRequests; rowIdx > 0; rowIdx--) {
        var rowId = data[rowIdx][changeIdIdx];
        if (rowId.includes(typeLetter)) {
            latestId = rowId;
            break;
        }
    }
    if (latestId == null) {
        return typeLetter + "-001";
    } else {
        var numStr = "0." + latestId.substring(latestId.indexOf("-") + 1); // converts ID (N-001) into number string ("0.001")
        var nextNum = (parseFloat(numStr) + 0.001).toFixed(3).toString() // converts string to float and increments by 1
        return typeLetter + "-" + nextNum.substring(nextNum.indexOf(".") + 1); // converts back to string ID form
    }
}

// convertToTypeLetter : String -> String
// convert long-form string to single character short-form of change request type
function convertToTypeLetter(requestType) {
    if (requestType == "New Function") {
        return "N";
    } else if (requestType == "Design Issue") {
        return "I";
    } else if (requestType == "Project Delay") {
        return "D";
    } else if (requestType == "Budget") {
        return "B";
    } else if (requestType == "Stage Transition") {
        return "S";
    } else if (requestType == "Other") {
        return "O";
    } else {
        throw "Request type not supported, found " + requestType;
    }
}
