'use strict';

chrome.runtime.onMessage.addListener(function(msg) {
    if(msg.action === "highlight"){
        let isInputTextAttribute = (msg.targetAttr !==  undefined);
        let regex = isInputTextAttribute ? new RegExp(msg.targetAttr.highlightRegexStr) : new RegExp(msg.inputText, "gim");
        markText(regex);
    }
});