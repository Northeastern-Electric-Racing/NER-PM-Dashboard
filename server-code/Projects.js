/*
Document: JS code specific for projects
*/

// constants for 'Slide Deck' and 'BOM' text, to follow best practice of keeping things in one place
const SLIDE_DECK_STR = "Slide Deck";
const BOM_STR = "BOM";

/**
 * Returns HTML formatted list of all projects.
 * 
 * @return {String} – A constructed HTML table listing all the projects
 */
function getAllProjects() {
    var data = getSheetInfo('mainSheetID', 'Projects', 'data');
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
    return displayText.link(url);
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
        data[rowIdx][slideDeckColIdx] = getHTMLLink(slideDeckURL, SLIDE_DECK_STR);
        data[rowIdx][bomColIdx] = getHTMLLink(bomURL, BOM_STR);
        }
    }


