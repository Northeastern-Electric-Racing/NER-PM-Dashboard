/*
 * Document: JS code specific for Gantt chart tab
 */

/**
 * Provides HTML content for viewing the Gantt chart in a small viewer or a full-page view 
 * built using a modal and sized with the provided width and height for the page.
 * 
 * @param {Number} width - HTML page width
 * @param {Number} height - HTML page height
 * @return {String} – Formatted HTML string content containing iframes for the Gantt chart
 */
function getEntireGanttSheet(width, height) {
    var modalWidth = width * 0.85;
    var modalHeight = height * 0.95;
    var iFrameWidth = modalWidth - 32;
    var iFrameHeight = modalHeight - 94;
    var html = `<div>
                    <div class="p-3">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#centeredFullGantt">
                            View Full Gantt
                        </button>
                        <div class="modal fade" id="centeredFullGantt" tabindex="-1" role="dialog" aria-labelledby="centeredFullGantt" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content" style="width: ` + modalWidth + `px; height: ` + modalHeight + `px; left: 50%; transform: translate(-50%, 0%);">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Full Gantt Chart</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21BbKSgpjzx-GgFu8OymjbgaaWcp-VnTcNdeFYiMmcib_LTpYQcs4229ZvGBwUNrB8zBpOqzYvF7v/pubhtml?gid=100811517&amp;single=true&amp;widget=true&amp;headers=false"
                                                style="width: ` + iFrameWidth + `px; height: ` + iFrameHeight + `px">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="big-gantt">
                        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ21BbKSgpjzx-GgFu8OymjbgaaWcp-VnTcNdeFYiMmcib_LTpYQcs4229ZvGBwUNrB8zBpOqzYvF7v/pubhtml?gid=100811517&amp;single=true&amp;widget=true&amp;headers=false"
                                style="width: 100%; height: 700px">
                        </iframe>
                    </div>
                </div>`;
    return html;
}
