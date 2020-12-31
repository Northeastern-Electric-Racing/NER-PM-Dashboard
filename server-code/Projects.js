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
