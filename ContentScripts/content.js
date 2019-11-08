'use strict';

chrome.runtime.onMessage.addListener(function(msg) {
    if(msg.action === "highlight"){
        let isInputTextAttribute = (msg.targetAttr !==  undefined);
        let regex = isInputTextAttribute ? new RegExp(msg.targetAttr.highlightRegexStr, "gim") : new RegExp(msg.inputText, "gim");
        chrome.storage.sync.set({"prevUserInputText":msg.inputText}, null);
        markText(regex);
    }
    else if (msg.action === "cancelHighlight") {
        unmarkText();
    }
});
