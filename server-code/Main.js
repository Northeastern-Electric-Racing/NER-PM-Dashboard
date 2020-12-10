/*
Document: Main JS code

*/

var scriptProps = PropertiesService.getScriptProperties(); // Google apps script properties

// doGet : HttpsRequest -> HTML
// Serve up the website HTML from Index.html
function doGet(request) {
    return HtmlService.createTemplateFromFile('page-content/Index').evaluate();
}

// include : String -> HTML
// Serve HTML content from the file specified by the string file name
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// testFunc : n/a -> Error
// Function for testing features and functions
function testFunc() {
  validateWbsNum("1.1.1");
}

// getSheetInfo : String String -> Object[]
// Fetches Range object of spreadsheet data given the script property name where the file ID is stored and the sheet name
function getSheetInfo(fileIDPropName, sheetName, dataReturnType) {
    var fileId = scriptProps.getProperty(fileIDPropName);
    var file = SpreadsheetApp.openById(fileId);
    var sheet = file.getSheetByName(sheetName);
    var range = sheet.getDataRange();
    var data = range.getValues();
    if (dataReturnType == "sheet") {
        return sheet;
    } else if (dataReturnType == "range") {
        return range;
    } else if (dataReturnType == "data") {
        return data;
    } else {
        throw "Invalid Spreadsheet return type";
    }
}

// findIdx : Array[] any -> Number
// Return index of given item in the given array, throws error if not found
function findIdx(item, array) {
    var idx = array.indexOf(item);
    if (idx == -1) {
        throw "Item not found in array";
    } else {
        return idx;
    }
}

// validateWbsNum : String -> n/a
// Is the provided string a valid Work Breakdown Structure number? (If no, throw an error)
function validateWbsNum(wbsNum) {
    var errorMsg = "WBS Invalid: ";
    if (wbsNum.match(/\./g) == null) {
        throw errorMsg + "WBS #s include periods, none found";
    } else if (wbsNum.match(/\./g).length != 2) {
        throw errorMsg + "incorrect number of periods";
    } else if (wbsNum.charAt(0) != "1" && wbsNum.charAt(0) != "2" && wbsNum.charAt(0) != "X") {
        throw errorMsg + "function areas are only 1 or 2, found " + wbsNum.charAt(0);
    }
}

// buildUnorderedListHTML : String String -> HTML
// Processes text with specified delimiter to produce an HTML unordered list
function buildUnorderedListHTML(text, delimiter) {
    return `<ul>` + buildListHTML(text, delimiter) + `</ul>`;
}

// buildOrderedListHTML : String String -> HTML
// Processes text with specified delimiter to produce an HTML ordered list (ordered subbullets not supported)
function buildOrderedListHTML(text, delimiter) {
    return `<ol>` + buildListHTML(text, delimiter) + `</ol>`;
}

// buildListHTML : String String -> HTML
// Processes text with specified delimiter to produce HTML of list elements
function buildListHTML(text, delimiter) {
    var textRemaining = text;
    var list = "";
    while(textRemaining.indexOf(delimiter) != -1) {
        nextIdx = textRemaining.indexOf(delimiter);
        var line = textRemaining.slice(0, nextIdx);
        if (line.slice(0, 1) == "\n") { // check and remove "\n" from the line
            line = line.slice(1);
        }
        if (line.slice(0, 1) == "-") { // "-" to begin the line means a subbullet
            list += `\n<ul><li>` + line.slice(1) + `</li></ul>`;
        } else {
            list += `\n<li>` + line + `</li>`;
        }
        textRemaining = textRemaining.slice(nextIdx + 1);
    }
    if (list.slice(0, 1) == "\n") { // check and remove "\n" from the front of the list
        list = list.slice(1);
    }
    return list;
}

/**
 * Construct an HTML table given the content (with header row) and modifiers.
 *
 * @param {Object[][]} content - The content to construct the HTML table with (includes headers).
 * @param {string} modifiers - The class modifiers to apply to the table.
 * @returns {string} A constructed HTML table with the given content.
 */
function buildTableHTML(content, modifiers) {
    var html = `<div class="table-container"><table class="table ` + modifiers + `"><thead><tr>`;
    for (var hCol = 0; hCol < content[0].length; hCol++) {
        html += `<th scope="col">` + content[0][hCol] + `</th>`;
    }
    html += `</tr></thead><tbody>`;
    for (var rowIdx = 1; rowIdx < content.length; rowIdx++) {
        html += `<tr><th scope="row">` + content[rowIdx][0] + `</th>`;
        for (var colIdx = 1; colIdx < content[rowIdx].length; colIdx++) {
            html += `<td>` + content[rowIdx][colIdx] + `</td>`;
        }
        html += `</tr>`;
    }
  return html + `</tbody></table></div>`;
}

// getPlaceholderHTML : String -> HTML
// Get HTML for placeholder content given placeholder text
function getPlaceholderHTML(text) {
    var html = `<div class="placeholder-content">
                    ` + text + `
                </div>`;
    return html;
}
