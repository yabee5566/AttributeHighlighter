'use strict';


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'highlight_prev') {
        markPrevInputAttr();
    }
});

function markPrevInputAttr(){
    let prevAttr = getPrevInputAttr();
    markText(prevAttr);
}

function getPrevInputAttr() {
    //TODO: load prev input from storage
    return "input real things here"; //Dummy data for testing
}

function markText(attr){
     let regEx = getAttrRegEx(attr);
     $("*").markRegExp(regEx);
}

function getAttrRegEx(attr) {
    //TODO: Use enum attr and switch to return regex
    return /is/gim;
}