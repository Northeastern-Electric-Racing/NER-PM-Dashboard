/*
Document: JS code specific for delivering the reports

*/

// getReport : String -> HTML
// return HTML content for the specified report type
function getReport(reportType) {
    if (reportType == "dashboard") {
        return getPlaceholderHTML("* Coming Soon! *");
    } else if (reportType == "deadlines") {
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
 * Returns an HTML formatted table of all active work packages that are due this week and next week.
 *
 * @returns {string} An HTML table with work packages due this week and next week.
 */
function getUpcomingDeadlines() {
    let data = getSheetInfo('mainSheetID', 'Work Packages', 'data');
    return buildDeadlinesTable(data);
}

/**
 * Builds the HTML table with active work packages due this week and next week.
 *
 * @param {Object[][]} data - The content from the 'work packages' tab in the PM 21 spreadsheet.
 * @returns {string} An HTML table with the work packages due this week and next week.
 */
function buildDeadlinesTable(data) {
    let thisWeek = [];
    let nextWeek = [];

    // add headers for tables
    thisWeek.push(["WBS #", "Project", "Name"]);
    nextWeek.push(["WBS #", "Project", "Name"]);

    for(let row = 1; row < data.length; row++) {
        // check if work package is active or not
        if(data[row][4] === "A") {
            let task = [data[row][2], data[row][0], data[row][3]];

            let date = new Date();
            let mondayOfCurrWeek = getMondayOfCurrWeek(date);
            let deadline = new Date(data[row][9]);
            let differenceInDays = (deadline - mondayOfCurrWeek) / 1000 / 60 / 60 / 24;

            if(differenceInDays >-1 && differenceInDays <= 6) {
                thisWeek.push(task);
            } else if(differenceInDays > 6 && differenceInDays <= 13) {
                nextWeek.push(task);
            }
        }
    }
    // constructing the tables separately
    let thisWeekTable = buildTableHTML(thisWeek, "table-md");
    let nextWeekTable = buildTableHTML(nextWeek, "table-md");

    // return combined table
    return `<div class="upcoming-deadline-flex-container">
           <h3>This Week</h3>
            ` + thisWeekTable + `
           <h3>Next Week</h3> 
            ` + nextWeekTable + `
      </div>`;
}

/**
 * Gets the beginning of the week by returning the date of the Monday of the provided date.
 * For instance, if the date 12/3/20 is provided, then the function will return 11/30/20.
 *
 * @param {Date} date - The date in which to get the beginning of the week for.
 * @returns {Date} The beginning of the week (Monday) for the provided date.
 */
function getMondayOfCurrWeek(date) {
    date = new Date(date);
    let day = date.getDay();
    let diff = date.getDate() - day + (day === 0 ? -6:1);
    return new Date(date.setDate(diff));
}






