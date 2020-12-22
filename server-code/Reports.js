/*
Document: JS code specific for delivering the reports

*/

// getReport : String -> HTML
// return HTML content for the specified report type
function getReport(reportType) {
    if (reportType == "changes") {
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
