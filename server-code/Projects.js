/*
Document: JS code specific for projects
*/

/**
 * Returns HTML content for the specified project type.
 * 
 * @param {String} projectType – The type of project to get HTML content for
 * @return {String} – The corresponding HTML content for the project type
 */
function getProjectInfo(projectType) {
    if (projectType == "all-projects") {
        return getAllProjects();
    } else if (projectType == "inactive-projects") {
        return getProjectTable(INACTIVE_PROJECT_STATUS);
    } else {
        throw "Requested project type " + projectType + " not supported";
    }
}

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
 * Returns HTML formatted list of all active projects.
 * 
 * @param {String} desiredProjectStatus – The string that represents the project status to watch for
 * @return {String} – A constructed HTML table listing all active projects
 */
function getProjectTable(desiredProjectStatus) {
    var data = getSheetInfo(MAIN_SHEET_ID_STR, PROJECTS_STR, DATA_STR);
    var headers = data[0];
    var projectStatusColIdx = findIdx("Project Status", headers);
    headers = headers.slice(0, -1);
    var activeProjects = [headers];
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        projectStatus = data[rowIdx][projectStatusColIdx];
        if (projectStatus === desiredProjectStatus) {
            projectList.push(data[rowIdx].slice(0, -1))
        }
    }
    transformToHyperLinks(activeProjects);
    return buildTableHTML(activeProjects, "table-sm");
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
 * Produces HTML display output for given WBS #'s project.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to get project display output for
 * @return {String} – Raw HTML display output (specifically a description list) corresponding to the project
 *                    attached to the specified work breakdown structure #
 */
function getProject(wbsNum) {
    return getProjectHtml(getProjectObj(wbsNum));
}

/** 
 * Builds project object from spreadsheet data.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to find data/build a project object for
 * @return {Object} – A JavaScript object representing the project corresponding to the given wbsNum
 */
function getProjectObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetInfo(MAIN_SHEET_ID_STR, PROJECTS_STR, DATA_STR);
    var headers = data[0];
    var wbsColIdx = findIdx("WBS #", headers);
    var rowData = [];
    var wbsRow = 0;
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        if (data[rowIdx][wbsColIdx] === wbsNum) {
            rowData = data[rowIdx];
            wbsRow = rowIdx;
            break;
        }
    }
    if (rowData.length === 0) {
        throw "No Project data found."
    }
    var project = {
        wbsRowIdx: wbsRow,
        wbsNum: rowData[wbsColIdx],
        name: rowData[findIdx("Name", headers)],
        projectLead: rowData[findIdx("Project Lead", headers)],
        projectManager: rowData[findIdx("Project Manager", headers)],
        projectStatus: rowData[findIdx("Project Status", headers)],
        slideDeckLink: rowData[findIdx("Slide Deck", headers)],
        bomLink: rowData[findIdx("BOM", headers)],
    };
    return project;
}

/** 
 * Goes through spreadsheet data to get the WBS#s for the work packages associated with the given project and
 * then returns a 2D array containing that information.
 * 
 * @param {String} project – The Work Breakdown Structure # to find data/build a project object for
 * @return {String[][]} – A 2-D Array representing the table of WBS#s
 */
function getProjectWorkPackagesTable(project) {
    var data = getSheetInfo(MAIN_SHEET_ID_STR, WORK_PACKAGES_STR, DATA_STR);
    var headers = data[0];
    var wbsColIdx = findIdx("WBS #", headers);
    var projWBSNum = project.wbsNum;
    var projWithoutLastChar = projWBSNum.slice(0, -1);
    var projectWorkPackagesTable = [];
    for (var rowIdx = 1; rowIdx < data.length; rowIdx++) {
        var wpWBSNum = data[rowIdx][wbsColIdx];
        if (wpWBSNum.slice(0, projWithoutLastChar.length) === projWithoutLastChar) {
            projectWorkPackagesTable.push([wpWBSNum]);
        }
        // in this case, you have already discovered the associated WPs, so no unnecessary iterations
        // compare to len 1 because you'll always have the header list
        else if (projectWorkPackagesTable.length > 1) {
            break;
        }
    }
    return projectWorkPackagesTable;
}

/**
 * Builds HTML description list from fields in given project.
 * 
 * @param {Object} project – The project whose fields to build a description list for
 * @return {String} – Raw HTML description list built from the given project's fields 
 */
function getProjectHtml(project) {
    var projectWorkPackagesTable = getProjectWorkPackagesTable(project);
    var html = `<div class="data-frame">
                    <dl class="row">
                        <dt class="col-sm-3">Project Name</dt>
                        <dd class="col-sm-9">` + project.name + `</dd>
                        <dt class="col-sm-3">WBS #</dt>
                        <dd class="col-sm-9">` + project.wbsNum + `</dd>
                        <dt class="col-sm-3">Project Status</dt>
                        <dd class="col-sm-9">` + project.projectStatus + `</dd>
                        <hr>
                        <dt class="col-sm-3">Project Lead</dt>
                        <dd class="col-sm-9">` + project.projectLead + `</dd>
                        <dt class="col-sm-3">Project Manager</dt>
                        <dd class="col-sm-9">` + project.projectManager + `</dd>
                        <hr>
                        <dt class="col-sm-3">Slide Deck Link</dt>
                        <dd class="col-sm-9">` + getHTMLLink(project.slideDeckLink, SLIDE_DECK_STR) + `</dd>
                        <dt class="col-sm-3">BOM Link</dt>
                        <dd class="col-sm-9">` + getHTMLLink(project.bomLink, BOM_STR)  + `</dd>
                        <hr>
                        <dt class="col-sm-3">Project WPs</dt>
                        <dd class="col-sm-5">` + buildTableHTML(projectWorkPackagesTable)  + `</dd>
                    </dl>
                </div>`;
    return html;
}
