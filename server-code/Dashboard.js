/*
Document: JS code specific for status dashboard/upcoming deadlines
*/

/**
 * Returns HTML content for the specified dashboard type
 * @param {String} dashboardType 
 * @return {String}
 */
function getDashboard(dashboardType) {
    if (dashboardType == "dashboard") {
        return getStatusDashboard();
    } else if (dashboardType == "deadlines") {
        return getUpcomingDeadlines();
    } else {
        throw "Requested dashboard type not supported: " + dashboardType;
    }
}

/**
 * Returns an HTML formatted table of all active work packages that are due this week and next week.
 *
 * @returns { String } An HTML table with work packages due this week and next week.
 */
function getUpcomingDeadlines() {
    let data = getSheetInfo('mainSheetID', 'Work Packages', 'data');
    return buildDeadlinesTable(data);
}

/**
 * Builds the HTML table with active work packages due this week and next week.
 *
 * @param { Object[][] } data - The content from the 'work packages' tab in the PM 21 spreadsheet.
 * @returns { String } An HTML table with the work packages due this week and next week.
 */
function buildDeadlinesTable(data) {
    let thisWeek = [];
    let nextWeek = []; // empty arrays to push values into
    thisWeek.push(["WBS #", "Project", "Name"]);
    nextWeek.push(["WBS #", "Project", "Name"]); // add headers for tables

    for(let row = 1; row < data.length; row++) { // iterate through all given data
        if(data[row][4] === "A") { // check if work package is active or not
            let task = [data[row][2], data[row][0], data[row][3]];

            let date = new Date();
            let mondayOfCurrWeek = getMondayOfCurrWeek(date);
            let deadline = new Date(data[row][9]);
            let differenceInDays = (deadline - mondayOfCurrWeek) / 1000 / 60 / 60 / 24;

            // push data into proper table
            if(differenceInDays >-1 && differenceInDays <= 6) {
                thisWeek.push(task);
            } else if(differenceInDays > 6 && differenceInDays <= 13) {
                nextWeek.push(task);
            }
        }
    }
    let thisWeekTable = buildTableHTML(thisWeek, "table-md");
    let nextWeekTable = buildTableHTML(nextWeek, "table-md"); // constructing the tables separately

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
 * @param { Date } date - The date in which to get the beginning of the week for.
 * @returns { Date } The beginning of the week (Monday) for the provided date.
 */
function getMondayOfCurrWeek(date) {
    date = new Date(date);
    let day = date.getDay();
    let diff = date.getDate() - day + (day === 0 ? -6:1);
    return new Date(date.setDate(diff));
}

/**
 * Returns an HTML formatted table of active work packages that should already be done
 * and active work packages that are behind (difference >= 25%).
 *
 * @returns { String } An HTML table with work packages that are expected to be done
 *                     and work packages that are behind.
 */
function getStatusDashboard() {
    let data = getSheetInfo('mainSheetID', 'Work Packages', 'data');
    return buildStatusDashboard(data);
}

/**
 * Builds the HTML table with work packages that are expected to be done and behind.
 *
 * @param { Object[][] } data - The content from the 'work packages' tab in the PM 21 spreadsheet.
 * @returns { String } An HTML table with work packages that are expected to be done
 *                     and work packages that are behind.
 */
function buildStatusDashboard(data) {
    let expectedDone = [];
    let behind = []; // empty arrays to push values into
    expectedDone.push(["WBS #", "Project", "Name"]);
    behind.push(["WBS #", "Project", "Name"]); // add headers for tables
    let date = new Date();

    for (let row = 1; row < data.length; row++) { // iterate through the work package data
        if(data[row][4] === "A") { // check if work package is active or not
            let task = [data[row][2], data[row][0], data[row][3]];
            let deadline = new Date(data[row][9]);
            let status = data[row][5];
            let difference = data[row][7];

            // push data into proper table
            if(date.getTime() >= deadline.getTime() && status !== 1) {
                expectedDone.push(task);
            } else if(date.getTime() < deadline.getTime() && difference >= 0.25) {
                behind.push(task);
            }
        }
    }

    let expectedDoneTable = buildTableHTML(expectedDone, "table-md");
    let behindTable = buildTableHTML(behind, "table-md"); // constructing the tables separately

    // return combined table
    return `<div class="upcoming-deadline-flex-container">
                 <h3>Expected Done</h3>
                     ` + expectedDoneTable + `
                 <h3>Behind</h3> 
                     ` + behindTable + `
            </div>`;
}
