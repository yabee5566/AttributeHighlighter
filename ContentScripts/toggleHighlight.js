'use strict';

}


function markText(regEx) {
    $("*").unmark({
        done: function () {
            $("*").markRegExp(regEx);
            chrome.storage.sync.set({isMarked: true}, null);
        }
    });
}
function unmarkText() {
    $("*").unmark();
    chrome.storage.sync.set({isMarked: false}, null);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}