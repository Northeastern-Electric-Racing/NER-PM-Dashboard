/*
Document: JS code specific for delivering the reports
*/

/**
 * Returns HTML content for the specified report type.
 * 
 * @param {String} reportType – The type of report to get HTML content for
 * @return {String} – The corresponding HTML content for the report type
 */
function getReport(reportType) {
    if (reportType == "changes") {
        return getAllChangeRequests();
    } else if (reportType == "fab") {
        return getAllFabLogs();
    } else {
        throw "Requested report type " + reportType + " not supported";
    }
}

/**
 * Returns HTML formatted list of all change requests.
 * 
 * @return {String} – A constructed HTML table listing all the change requests
 */
function getAllChangeRequests() {
    var data = getSheetInfo(MAIN_SHEET_ID_STR, CHANGE_REQUESTS_STR, DATA_STR);
    return buildTableHTML(data, "table-sm");
}

/**
* Returns HTML formatted list of all fab and weld reports
*
* @return {String} - Constructed HTML table listing all the fab and weld reports
*/
function getAllFabLogs() {
	var data = getSheetInfo('mainSheetID', 'Fab & Weld', 'data');
    return buildTableHTML(data, "table-sm");
}