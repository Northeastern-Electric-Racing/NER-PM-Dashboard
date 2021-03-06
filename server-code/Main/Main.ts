/*
Document: Main JS code
*/
// @ts-ignore
var scriptProps = PropertiesService.getScriptProperties(); // Google apps script properties

/**
 * Serves up the website HTML from Index.html. This function is run by Apps Script whenever a
 * user visits the app or a program sends the app an HTTP GET request.
 *
 * @return {HtmlOutput} – Sanitized website HTML content
 */
function doGet(request) {
  // @ts-ignore
  return HtmlService.createTemplateFromFile('page-content/Index')
    .evaluate()
    .setFaviconUrl('https://i.imgur.com/kLaEj01.png')
    .setTitle('NER Project Management');
}

/**
 * Serves HTML content from the file specified by the file name.
 *
 * @param {String} filename – The name of the file to get content from
 * @return {String} – The HTML content present in the file
 */
function include(filename) {
  // @ts-ignore
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Function for testing features and functions.
 *
 * @return {Error}
 */
function testFunc() {
  validateWbsNum("1.1.1");
}

/**
 * Fetches spreadsheet data given the script property name where the file ID is stored and the sheet name.
 *
 * @param {String} fileIDPropName – The script property name where the file ID is stored
 * @param {String} sheetName – The name of the Sheet
 * @param {String} dataReturnType – The type of data that will be returned
 * @return {(Sheet|Range|Object[][])} – The spreadsheet data retrieved
 */
function getSheetInfo(fileIDPropName, sheetName, dataReturnType) {
  var fileId = scriptProps.getProperty(fileIDPropName);
  // @ts-ignore
  var file = SpreadsheetApp.openById(fileId);
  var sheet = file.getSheetByName(sheetName);
  var range = sheet.getDataRange();
  var data = range.getValues();
  // @ts-ignore
  if (dataReturnType == SHEET_STR) {
    return sheet;
    // @ts-ignore
  } else if (dataReturnType == RANGE_STR) {
    return range;
    // @ts-ignore
  } else if (dataReturnType == DATA_STR) {
    return data;
  } else {
    throw "Invalid Spreadsheet return type";
  }
}

/**
 * Returns index of given item in the given array, throws error if not found
 *
 * @param {Any} item – Something to check membership for in the given array
 * @param {Array[]} array – The array in which item may or may not belong to
 * @return {number} – The index of item in the given array, if the item is a member, otherwise throws error
 */
function findIdx(item, array) {
  var idx = array.indexOf(item);
  if (idx == -1) {
    throw "Item not found in array";
  } else {
    return idx;
  }
}

export { findIdx };
/**
 * Checks whether the provided string a valid Work Breakdown Structure number. (If not, throw an error).
 *
 * @param {String} wbsNum – The Work Breakdown Structure # to validate
 */
function validateWbsNum(wbsNum) {
  var errorMsg = "WBS Invalid: ";
  if (wbsNum.match(/\./g) == null) {
    throw errorMsg + "WBS #s include periods, none found";
  } else if (wbsNum.match(/\./g).length != 2) {
    throw errorMsg + "incorrect number of periods";
  } else if (
    wbsNum.charAt(0) != "1" &&
    wbsNum.charAt(0) != "2" &&
    wbsNum.charAt(0) != "X"
  ) {
    throw (
      errorMsg + "function areas are only 1 or 2, found " + wbsNum.charAt(0)
    );
  }
}

/**
 * Processes text with specified delimiter to produce an HTML unordered list.
 *
 * @param {String} text – The text to parse
 * @param {String} delimiter – The delimiter to look out for in order to parse
 * @return {String} – An unordered HTML list based off of the given text
 */
function buildUnorderedListHTML(text, delimiter) {
  if (text === "") {
    return "—";
  } else {
    return `<ul>` + buildListHTML(text, delimiter) + `</ul>`;
  }
}

/**
 * Processes text with specified delimiter to produce an HTML ordered list (ordered subbullets not supported).
 *
 * @param {String} text – The text to parse
 * @param {String} delimiter – The delimiter to look out for in order to parse
 * @return {String} – An ordered HTML list based off of the given text
 */
function buildOrderedListHTML(text, delimiter) {
  if (text === "") {
    return "—";
  } else {
    return `<ol>` + buildListHTML(text, delimiter) + `</ol>`;
  }
}

/**
 * Processes text with specified delimiter to produce HTML of list elements.
 *
 * @param {String} text – The text to parse
 * @param {String} delimiter – The delimiter to look out for in order to parse
 * @return {String} – An HTML list based off of the given text
 */
function buildListHTML(text, delimiter) {
  var textRemaining = text;
  var list = "";
  while (textRemaining.indexOf(delimiter) != -1) {
    // @ts-ignore
    nextIdx = textRemaining.indexOf(delimiter);
    // @ts-ignore
    var line = textRemaining.slice(0, nextIdx);
    if (line.slice(0, 1) == "\n") {
      // check and remove "\n" from the line
      line = line.slice(1);
    }
    if (line.slice(0, 1) == "-") {
      // "-" to begin the line means a subbullet
      list += `\n<ul><li>` + line.slice(1) + `</li></ul>`;
    } else {
      list += `\n<li>` + line + `</li>`;
    }
    // @ts-ignore
    textRemaining = textRemaining.slice(nextIdx + 1);
  }
  if (list.slice(0, 1) == "\n") {
    // check and remove "\n" from the front of the list
    list = list.slice(1);
  }
  return list;
}

/**
 * Constructs an HTML table given the content (with header row) and modifiers.
 *
 * @param {Object[][]} content - The content to construct the set of cards (stack) with (includes headers)
 * @param {Object} modifiers - Some constraints for the function to operate within
 * @returns {string} The resultant card stack
 */
function buildTableHTML(content, modifiers) {

    if (content.length == 1) { return '<p class="p-3">N/A</p>'; } //if there is no content to display, simply return this.

    var html = '<div class="table-container"><div class="row">'; //begin the container

    for (var i = 1; i < content.length; i++) { //for each row after the headers
        var randomSeed = Math.floor(Math.random() * 1000000); //random seed is required here to generate unique IDs for each card
        html += '<div class="col-md-'+ (12 / modifiers.cols) +'">';

        if (content.length - i > 4) { html += '<div class="card mb-4">'; } else { html += '<div class="card">'; } //a visual update to make sure the last row does not have margin-bottom

        html += '<div class="card-header" data-toggle="collapse" data-target="#collapseCard' + randomSeed + '" aria-expanded="false" aria-controls="collapseCard' + randomSeed + '">';
        html += '<div class="card-title mb-0"><b>' + content[i][findIdx(modifiers.header1, content[0])] + '</b><span class="float-right">' + content[i][findIdx(modifiers.header2, content[0])] + '</span></div></div>'; //end card-body here

        html += '<div id="collapseCard' + randomSeed + '" class="collapse hide" aria-labelledby="cardHeading">'; //the collapsible part of the card
        html += '<ul class="list-group list-group-flush">';
        for (var j = 1; j < content[i].length; j++) { //for each coloumn in the row
            if ((content[0][j] != modifiers.header1) && (content[0][j] != modifiers.header2)) { //makes sure we are not re-printing the headers
                html += '<li class="list-group-item"><b> ' + content[0][j] + '</b> : <span class="float-right">' + content[i][j] + '</span></li>';
            }      
        }
        html += '</ul></div></div></div>'; // end card here
    }

    html += '</div></div>'; // end row and table container
    return html;

}

/**
 * Constructs an HTML table for the wbs table for project lookup.
 *
 * @param {Object[][]} content - The content to construct the HTML table with (includes headers)
 * @param {string} modifiers - The class modifiers to apply to the table
 * @returns {string} A constructed HTML table with the given content
 */
function buildTableHTMLWBSTable(content, modifiers) {
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

/**
 * Gets HTML for placeholder content given placeholder text.
 *
 * @param {String} text – Placeholder text
 * @return {String} – HTML for placeholder content, having incorporated placeholder text
 */
function getPlaceholderHTML(text) {
  var html =
    `<div class="placeholder-content">
                    ` +
    text +
    `
                </div>`;
  return html;
}

export { validateWbsNum };
