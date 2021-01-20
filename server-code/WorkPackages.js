/*
Document: JS code specific for Work Packages
*/

/**
 * Produces HTML display output for given WBS #'s work package.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to get work package display output for
 * @return {String} – Raw HTML display output (specifically a description list) corresponding to the work package 
 *                    attached to the specified work breakdown structure #
 */
function getWorkPackage(wbsNum) {
    return getWorkPackageHtml(getWorkPackageObj(wbsNum));
}

/**
 * Builds work package object from spreadsheet data.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to find data/build a work package object for
 * @return {Object[Work Package]} – A work package object corresponding to the given wbsNum
 */
function getWorkPackageObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetInfo(MAIN_SHEET_ID_STR, WORK_PACKAGES_STR, DATA_STR);
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
        throw "No Work Package data found."
    }
    var workPackage = {
        wbsRowIdx: wbsRow,
        project: rowData[findIdx("Project", headers)],
        lead: rowData[findIdx("Project Lead", headers)],
        wbsNum: rowData[wbsColIdx],
        name: rowData[findIdx("WP Name", headers)],
        duration: rowData[findIdx("Duration", headers)] + " weeks",
        budget: "$" + rowData[findIdx("Budget", headers)],
        dependencies: rowData[findIdx("Dependencies", headers)],
        deliverable: rowData[findIdx("Deliverables", headers)],
        description: rowData[findIdx("Description", headers)],
        changes: rowData[findIdx("Changes", headers)],
        status: rowData[findIdx("Status", headers)],
        expected: rowData[findIdx("Expected", headers)],
        start: rowData[findIdx("Start", headers)],
        end: rowData[findIdx("End", headers)],
        spend: rowData[findIdx("Spend", headers)],
    };
    return workPackage;
}

/**
 * Builds HTML description list from fields in given work package.
 * 
 * @param {Object[Work Package]} workPackage – The work package whose fields to build a description list for
 * @return {String} – Raw HTML description list built from the given work package's fields 
 */
function getWorkPackageHtml(workPackage) {
    var html = `<div class="data-frame">
                    <dl class="row">
                        <dt class="col-sm-3">Project</dt>
                        <dd class="col-sm-3">` + workPackage.project + `</dd>
                        <dt class="col-sm-3">Project Lead</dt>
                        <dd class="col-sm-3">` + workPackage.lead + `</dd>
                        <hr>
                        <dt class="col-sm-3">WBS #</dt>
                        <dd class="col-sm-3">` + workPackage.wbsNum + `</dd>
                        <dt class="col-sm-3">WP Name</dt>
                        <dd class="col-sm-3">` + workPackage.name + `</dd>
                        <dt class="col-sm-3">Duration</dt>
                        <dd class="col-sm-3">` + workPackage.duration + `</dd>
                        <dt class="col-sm-3">Budget</dt>
                        <dd class="col-sm-3">` + workPackage.budget + `</dd>
                        <dt class="col-sm-3">Dependencies</dt>
                        <dd class="col-sm-9">` + workPackage.dependencies + `</dd>
                        <dt class="col-sm-3">Deliverable(s)</dt>
                        <dd class="col-sm-9">` + workPackage.deliverable + `</dd>
                        <dt class="col-sm-3">Description</dt>
                        <dd class="col-sm-9">` + buildUnorderedListHTML(workPackage.description, ";") + `</dd>
                        <dt class="col-sm-3">Changes</dt>
                        <dd class="col-sm-9">` + buildOrderedListHTML(workPackage.changes, ";") + `</dd>
                    </dl>
                </div>`;
    return html;
}