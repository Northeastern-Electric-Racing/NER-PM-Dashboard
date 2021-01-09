/*
Document: JS code specific for Lookups
*/

/**
 * Produces HTML display output for given WBS #'s project or work package.
 * 
 * @param {String} wbsNum – The Work Breakdown Structure # to get project or work package display output for
 * @return {String} – Raw HTML display output (specifically a description list) corresponding to the project or 
 *                    work package attached to the specified work breakdown structure #                   
 */

function getWBSElement(wbsNum) {
    validateWbsNum(wbsNum);
    var lastTwoChars = wbsNum.slice(-2);
    htmlOutput = lastTwoChars == ".0" ? getProject(wbsNum) : getWorkPackage(wbsNum);
    return htmlOutput;
}