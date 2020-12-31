/*
Document: JS code specific for Projects
*/

/**
 * Returns HTML formatted list of all projects.
 * 
 * @return {String} – A constructed HTML table listing all the projects
 */
function getProjects() {
    var data = getSheetInfo('mainSheetID', 'Projects', 'data');
    return buildTableHTML(data, "table-sm");
}