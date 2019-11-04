// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$(function() { // same as $( document ).ready(function() {
    let searchTextInput = $("#searchTextInput");
    searchTextInput.autocomplete({
    source: function (request, response) {
        let userInputText = $.ui.autocomplete.escapeRegex(request.term);
        let attrList = SEARCH_ATTRIBUTE_LIST.filter((attr) => {
            return attr.userInputKeyRegex.test(userInputText);
        });
        let attrNameList = attrList.map(function(attr){
            return attr.name;
        });
        response(attrNameList);
    },
    select: function( event, ui ) {
        if(event.keyCode == 13 || event.which == 13){
            return; // This part would be handled in keyup together
        }
        let inputText = $("#searchTextInput").val();
        triggerHighlighting(inputText);
    }
    });
    searchTextInput.keyup(function (event) {
    if(event.keyCode == 13 || event.which == 13){ // enter key
        let inputText = $("#searchTextInput").val();
        triggerHighlighting(inputText);
    }});
    chrome.storage.sync.get(["prevUserInputText"], function(items) {
        let autocompleteInput = $('.ui-autocomplete-input');
        if (items.prevUserInputText)
            autocompleteInput.focus().val(items.prevUserInputText);
        else
            autocompleteInput.focus();
    });
});

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

}