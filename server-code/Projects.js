/*
Document: JS code specific for projects
*/

/**
 * Returns HTML formatted list of all projects.
 * 
 * @return {String} – A constructed HTML table listing all the projects
 */
function getAllProjects() {
    var data = getSheetInfo('mainSheetID', 'Projects', 'data');
    return buildTableHTML(data, "table-sm");
}

/**
 * Builds project object from spreadsheet data.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to find data/build a project object for
 * @return {Object[Project]} – A project object corresponding to the given wbsNum
 */
function getProjectsObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetInfo('mainSheetID', 'Projects', 'data');
    var headers = data[0];
    var wbsColIdx = findIdx("WBS #", headers);
    var rowData = [];
    var wbsRow = 0;
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        if (data[rowIdx][wbsColIdx] == wbsNum) {
            rowData = data[rowIdx];
            wbsRow = rowIdx;
            break;
        }
    }
    if (rowData.length == 0) {
        throw "No Project data found."
    }
    var project = {
        wbsRowIdx: wbsRow,
        wbsNum: rowData[wbsColIdx],
        name: rowData[findIdx("Name", headers)],
        lead: rowData[findIdx("Project Lead", headers)],
        name: rowData[findIdx("Project Manager", headers)],
    };
    return project;
}
