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
    let html;

    let thisWeek = [];
    let nextWeek = [];


    // add header
    thisWeek.push(["WBS #", "Name", "Project"]);
    nextWeek.push(["WBS #", "Name", "Project"]);

    // iterate through data row by row, checking if the 'end' column is this week or next week
        // if it is, create js object with {wbs, project, name} and put in respective array
    for(let row = 1; row < data.length; row++) {

        let date = new Date();
        let mondayOfCurrWeek = getMondayOfCurrWeek(date);
        let deadline = new Date(data[row][9]);
        let differenceInDays = (deadline - mondayOfCurrWeek) / 1000 / 60 / 60 / 24;

        let task = [data[row][2], data[row][0], data[row][3]];

        if(differenceInDays >-1 && differenceInDays <= 6) {
            thisWeek.push(task);
        } else if(differenceInDays > 6 && differenceInDays <= 13) {
            nextWeek.push(task);
        }

        // nextWeek.push(task);
    }

    // thisWeek.map(task => {
    //     html += `<div class="">
    //                ` + task.wbs + task.project + task.name + `
    //             </div>`
    // });
    // nextWeek.map(task => {
    //     html += `<div class="">
    //                ` + task + `
    //             </div>`
    // });
    // thisWeek.map(task => {
    //     html += `<div class="">
    //                ` + task + `
    //             </div>`
    // });

     // html += `<div class="">
     //               ` + deadline + `
     //            </div>`




    // div class='content-container'
    // delegate to helper 3 times:
        // create tables with the js object arrays
            // div class='row' for each table
    let thisWeekTable = buildTableHTML(thisWeek, "table-md");
    let nextWeekTable = buildTableHTML(nextWeek, "table-md");


    // add/combine tables together and return
    return `<div class="upcoming-deadline-flex-container">
           <h3>This Week</h3>
            ` + thisWeekTable + `
           <h3>Next Week</h3> 
            ` + nextWeekTable + `
      </div>`;
}


function getMondayOfCurrWeek(date) {
    date = new Date(date);
    let day = date.getDay();
    let diff = date.getDate() - day + (day === 0 ? -6:1);
    return new Date(date.setDate(diff));
}






