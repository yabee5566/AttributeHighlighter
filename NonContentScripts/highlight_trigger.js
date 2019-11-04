function triggerHighlighting (inputText){
    let targetAttr;
    for (let attr of SEARCH_ATTRIBUTE_LIST) {
        if (attr.userInputKeyRegex.test(inputText)){
            targetAttr = attr;
            break;
        }
    }
    let msg = {
        action:"highlight",
        targetAttr:targetAttr,
        inputText:inputText
    };

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, JSON.parse(JSON.stringify(msg))); //Pass value instead of reference
    });
}
function triggerCancelingHighlight() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action:'cancelHighlight'});
    });
}