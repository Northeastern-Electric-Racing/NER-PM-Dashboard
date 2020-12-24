/*
Document: JS code specific for delivering the reports
*/

/**
 * Returns HTML content for the specified report type
 * @param {String} reportType 
 * @return {String}
 */
function getReport(reportType) {
    if (reportType == "changes") {
        return getAllChangeRequests();
    } else if (reportType == "fab") {
        return getPlaceholderHTML("* Coming Soon! *");
    } else {
        throw "Requested report type not supported: " + reportType;
    }
}

/**
 * Returns HTML formatted list of all change requests
 * @return {String}
 */
function getAllChangeRequests() {
    var data = getSheetInfo('mainSheetID', 'Change Requests', 'data');
    return buildTableHTML(data, "table-sm");
}
