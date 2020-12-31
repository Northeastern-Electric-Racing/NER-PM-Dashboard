/*
Document: JS code specific for Changes
*/

/**
 * Produces HTML display output form for specified change type.
 * 
 * @param {String} changeType – the type of change to get HTML display output for 
 * @return {String} – Raw HTML display output corresponding to the specified change type
 */
function getChangeForm(changeType) {
    if (changeType == "status") {
        return getStatusUpdateForm();
    } else if (changeType == "change") {
        return getChangeRequestForm();
    } else if (changeType == "covid") {
        return getCovidManufacturingForm();
    } else {
        throw "Change type not recognized";
    }
}

/**
 * Produces HTML display output for status update form.
 * 
 * @return {String} – Raw HTML display output for the status update form
 */
function getStatusUpdateForm() {
    var html = `<div class="data-frame">
                    <h4>Status Update</h4>
                    <form action="" id="su-sub-on-ent">
                        <div class="secondary-input">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">WBS #</span>
                                </div>
                                <input type="text" class="form-control" placeholder="X.X.X" 
                                        aria-label="Work Breakdown Structure Number"id="status-go-input">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit" id="status-go-btn">Go</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div id="status-content">
                        ` + getPlaceholderHTML("Enter WBS # Above") + `
                    </div>
                </div>`;
    return html;
}

/**
 * Produces HTML content for embedded Change Request Google Form.
 * 
 * @return {String} – Raw HTML display output for the Change Request Google Form
 */
function getChangeRequestForm() {
    var html = `<div class="change-form">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdofsnmBQJFXOpPMG7-WPGrgDAASAlu4EMryaH8oEDw9mPMDA/viewform?embedded=true" 
                                    height="1500" frameborder="0" marginheight="0" marginwidth="0">
                        Loading…
                    </iframe>
                </div>`;
    return html;
}

/**
 * Provides HTML content for embedded COVID Manufacturing Google Form.
 * 
 * @return {String} – Raw HTML display output for the COVID Manufacturing Google Form
 */
function getCovidManufacturingForm() {
    var html = `<div class="change-form">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeNklFqPT7L0P5WXTGtKIDECGjJ4bWFGCc08AFnP3i1EAtJUg/viewform?embedded=true" 
                                    height="2000" frameborder="0" marginheight="0" marginwidth="0">
                        Loading…
                    </iframe>
                </div>`;
    return html;
}

/**
 * Produces HTML display output for given WBS #'s work package.
 * 
 * @param {String} wbsNum – the Work Breakdown Structure # to get work package display output for
 * @return {String} – Raw HTML display output for the work package corresponding to the given WBS #
 */
function getStatusUpdateContent(wbsNum) {
    var workPackage = getWorkPackageObj(wbsNum);
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
                        <hr>
                        <dt class="col-sm-3">Current Status</dt>
                        <dd class="col-sm-9">` + workPackage.status * 100 + `%</dd>
                        <dt class="col-sm-3">New Status</dt>
                        <dd class="col-sm-9">` + getNewStatusInput() + `</dd>
                    </dl>
                </div>`;
    return html;
}

/**
 * Produces HTML display output for selecting new status.
 *
 * @return {String} – Raw HTML display output for selecting a new status
 */
function getNewStatusInput() {
    var html = `<form action="" id="ns-sub-on-ent">
                    <div class="input-group mb-3">
                        <select class="custom-select" id="new-status-go-input" aria-label="Status select with go button">
                            <option selected disabled>Choose...</option>
                            <option value="0.00">0%</option>
                            <option value="0.25">25%</option>
                            <option value="0.50">50%</option>
                            <option value="0.75">75%</option>
                            <option value="1.00">100%</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" id="new-status-go-btn">Submit</button>
                        </div>
                    </div>
                </form>`;
    return html;
}

/**
 * Sets status of WBS # in newStatus to number in newStatus.
 * 
 * @param {Object} newStatus - The new status for the WBS# to be set to
 * @return {String} – An HTML alert success message
 */
function setNewStatus(newStatus) {
    var wpData = getWorkPackageObj(newStatus.wbs);
    var sheet = getSheetInfo('mainSheetID', 'Work Packages', 'sheet');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var statusCell = sheet.getRange(wpData.wbsRowIdx + 1, findIdx("Status", headers) + 1);
    var statusCellFormat = statusCell.getNumberFormat(); // store number format to preserve formatting
    statusCell.setValue(newStatus.status);
    statusCell.setNumberFormat(statusCellFormat);
    var html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Set ` + newStatus.wbs + ` to ` + newStatus.status + `
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>`;
    return html;
}
