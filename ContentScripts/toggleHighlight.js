'use strict';
function toggleHighlight(isMarked){
    if (isMarked){
        unmarkText();
    }
    else{
        let prevAttr = getPrevInputAttr();
        markText(prevAttr);
    }
}

function getPrevInputAttr() {
    //TODO: load prev input from storage
    return "input real things here"; //Dummy data for testing
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