/*
Document: JS code specific for delivering the reports

*/

// getReport : String -> HTML
// return HTML content for the specified report type
function getReport(reportType) {
    if (reportType == "dashboard") {
        return getPlaceholderHTML("* Coming Soon! *");
    } else if (reportType == "deadlines") {
        // return getPlaceholderHTML("* Coming Soon! *");
        return getUpcomingDeadlines();
    } else if (reportType == "changes") {
        return getAllChangeRequests();
    } else if (reportType == "fab") {
        return getPlaceholderHTML("* Coming Soon! *");
    } else {
        throw "Requested report type not supported: " + reportType;
    }
}

// getAllChangeRequests : n/a -> HTML
// return HTML formatted list of all change requests
function getAllChangeRequests() {
    var data = getSheetInfo('mainSheetID', 'Change Requests', 'data');
    return buildTableHTML(data, "table-sm");
}



/**
 *
 */
function getUpcomingDeadlines() {
    let data = getSheetInfo('mainSheetID', 'Work Packages', 'data');

    // iterate through data and get 3 json arrays
        // construct main content (3 tables) given the 3 json arrays
    return buildDeadlinesTable(data);
}

/**
 *
 */
function buildDeadlinesTable(data) {
    let today = [];
    let tomorrow = [];
    let thisWeek = [];

    // iterate through data row by row, checking if the 'end' column is today, tmr, or this week
        // if it is, create json with {wbs, project, name} and put in respective array
    for(let row = 1; row < data.length; row++) {
        let today = new Date();

        let deadline = new Date(data[row][8]);
        let differenceInDays = (deadline - today) / 1000 / 60 / 60 / 24;
        if(differenceInDays < 1) {
            // add to today
        } else if(differenceInDays === 1) {
            // add to tmr
        } else if(differenceInDays > 1 && differenceInDays <= 7 ) {
            // add to this week
        }

        //  html += `<div class="">
        //                ` + deadline + `
        //             </div>`

    }
    // div class='content-container'
    // delegate to helper 3 times:
        // create tables with the json arrays
            // div class='row' for each table


    // add/combine 3 tables together and return


}






