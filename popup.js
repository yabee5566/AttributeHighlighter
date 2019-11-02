// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$(function() { // same as $( document ).ready(function() {
    let predefinedOptions = [
    "number", "time" //TODO: Use predefined attributes
  ];

  $("#searchTextInput").autocomplete({
    source: predefinedOptions,
    select: function( event, ui ) {
        if(event.keyCode == 13 || event.which == 13){
            return; // This part would be handled in keyup together
        }
        let inputText = $("#searchTextInput").val();
        triggerHighlighting(inputText);
    }
  });

  $("#searchTextInput").keyup(function (event) {
    if(event.keyCode == 13 || event.which == 13){ // enter key
        let inputText = $("#searchTextInput").val();
        triggerHighlighting(inputText);
    }
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