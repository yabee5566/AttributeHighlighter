'use strict';


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action === 'toggle_highlight') {
        toggleHighlight(msg.isMarked);
    }
});

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

function markText(attr) {
    let regEx = getAttrRegEx(attr);
    $("*").markRegExp(regEx);
    chrome.storage.sync.set({isMarked: true}, null);
}
function unmarkText() {
    $("*").unmark();
    chrome.storage.sync.set({isMarked: false}, null);
}

function getAttrRegEx(attr) {
    //TODO: Use enum attr and switch to return regex
    return /is/gim;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}