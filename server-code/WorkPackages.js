/*
Document: JS code specific for Work Packages

*/

// getWorkPackage : String -> HTML
// Produce HTML display output for given WBS #'s work package
function getWorkPackage(wbsNum) {
    return getWorkPackageHtml(getWorkPackageObj(wbsNum));
}

// getWorkPackageObj : String -> Object[Work Package]
// Build work package object from spreadsheet data
function getWorkPackageObj(wbsNum) {
    validateWbsNum(wbsNum);
    var data = getSheetInfo('mainSheetID', 'Work Packages', 'data');
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
        dependancies: rowData[findIdx("Dependencies", headers)],
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

// getWorkPackageHtml : Object[Work Package] -> HTML
// Builds HTML description list from fields in given work package
function getWorkPackageHtml(workPackage) {
    var html = `<div class="data-frame">
                    <dl class="row">
                        <dt class="col-sm-3">Project</dt>
                        <dd class="col-sm-9">` + workPackage.project + `</dd>
                        <dt class="col-sm-3">Project Lead</dt>
                        <dd class="col-sm-9">` + workPackage.lead + `</dd>
                        <hr>
                        <dt class="col-sm-3">WBS #</dt>
                        <dd class="col-sm-9">` + workPackage.wbsNum + `</dd>
                        <dt class="col-sm-3">WP Name</dt>
                        <dd class="col-sm-9">` + workPackage.name + `</dd>
                        <dt class="col-sm-3">Duration</dt>
                        <dd class="col-sm-9">` + workPackage.duration + `</dd>
                        <dt class="col-sm-3">Budget</dt>
                        <dd class="col-sm-9">` + workPackage.budget + `</dd>
                        <dt class="col-sm-3">Dependancies</dt>
                        <dd class="col-sm-9">` + workPackage.dependancies + `</dd>
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