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
 * Creates an HTML hyperlink, given the display text, that requests the given url.
 * 
 * @param {String} url – The url to link to
 * @param {String} displayText – The text that will be displayed
 * @return {String} – The corresponding HTML hyperlink
 */
function getHTMLLink(url, displayText) {
    return displayText.link(url);
}
