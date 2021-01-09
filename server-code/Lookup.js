/*
Document: JS code specific for Lookup
*/

/**
 * Produces HTML display output for given WBS #'s project or work package.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to get project or work package display output for
 * @return {String} – Raw HTML display output (specifically a description list) corresponding to the project or 
 *                    work package attached to the specified work breakdown structure #                   
 */

function getProjectOrWorkPackage(wbsNum) {
    validateWbsNum(wbsNum);
    var lastChar = wbsNum.charAt(wbsNum.length - 1);
    htmlOutput = lastChar == 0 ? getProject(wbsNum) : getWorkPackage(wbsNum);
    return htmlOutput;
}