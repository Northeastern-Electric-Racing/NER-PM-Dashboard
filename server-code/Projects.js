/*
Document: JS code specific for projects
*/

/**
 * Returns HTML formatted list of all projects.
 * 
 * @return {String} – A constructed HTML table listing all the projects
 */
function getAllProjects() {
    var data = getSheetInfo(MAIN_SHEET_ID_STR, PROJECTS_STR, DATA_STR);
    transformToHyperLinks(data);
    return buildTableHTML(data, "table-sm");
}

/**
 * Creates an HTML hyperlink, given the display text, that requests the given url.
 * 
 * @param {String} url – The url to link to
 * @param {String} displayText – The text that will be displayed
 * @return {String} – The corresponding HTML hyperlink
 */
function getHTMLLink(url, displayText) {
    var html = `<a href="${url}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
    return html
}

/**
 * Transforms the links in the Slide Deck and BOM columns into HTML links with the display text of 
 * "Slide Deck" or "BOM". 
 * 
 * @param {Object[][]} data – Spreadsheet data from the Projects table in the database
 * @return {void}
 */
function transformToHyperLinks(data) {
    var headers = data[0];
    var slideDeckColIdx = findIdx(SLIDE_DECK_STR, headers);
    var bomColIdx = findIdx(BOM_STR, headers);
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        slideDeckURL = data[rowIdx][slideDeckColIdx];
        bomURL = data[rowIdx][bomColIdx];
        data[rowIdx][slideDeckColIdx] = slideDeckURL ? getHTMLLink(slideDeckURL, SLIDE_DECK_STR) : "" // converts url to HTML or leaves as empty string
        data[rowIdx][bomColIdx] = bomURL ? getHTMLLink(bomURL, BOM_STR) : "" // converts url to HTML or leaves as empty string
    } 
}

/** 
 * Builds project object from spreadsheet data.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to find data/build a project object for
 * @return {Object[Project]} – A project object corresponding to the given wbsNum
 */
function getProjectsObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetInfo(MAIN_SHEET_ID_STR, PROJECTS_STR, DATA_STR);
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
        projectLead: rowData[findIdx("Project Lead", headers)],
        projectManager: rowData[findIdx("Project Manager", headers)],
        slideDeckLink: rowData[findIdx("Slide Deck", headers)],
        bomLink: rowData[findIdx("BOM", headers)],
    };
    return project;
}
