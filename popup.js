// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$(function() { // same as $( document ).ready(function() {
    setupSearchTextInput();
    setupBtns();
});

function setupBtns() {
    $("#highlightBtn").click(function () {
        let inputText = $("#searchTextInput").val();
        triggerHighlighting(inputText);
    });
    $("#cancelBtn").click(function () {
        triggerCancelingHighlight();
    });
}

function setupSearchTextInput(){
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
            setBodyHeightDueToDropdown(attrNameList.length);
            response(attrNameList);
        },
        select: function( event, ui ) {
            if(event.keyCode == 13 || event.which == 13){
                return; // This part would be handled in keyup together
            }
            let inputText = $("#searchTextInput").val();
            triggerHighlighting(inputText);
        },
        close:function () {
            setBodyHeightDueToDropdown(0);
        }
    });

    searchTextInput.keyup(function (event) {
        let isEnterKey = (event.keyCode == 13 || event.which == 13);
        if(isEnterKey) {
            $("#searchTextInput").autocomplete("close");
            if (event.shiftKey) {
                triggerCancelingHighlight()
            }
            else{
                let inputText = $("#searchTextInput").val();
                triggerHighlighting(inputText);
            }
        }
    });
    chrome.storage.sync.get(["prevUserInputText"], function(items) {
        let autocompleteInput = $('.ui-autocomplete-input');
        if (items.prevUserInputText)
            autocompleteInput.focus().val(items.prevUserInputText);
        else
            autocompleteInput.focus();
    });
}

function setBodyHeightDueToDropdown(optionNum){
    if (optionNum === undefined || optionNum === 0){
        $("body").css('height', 30);
    }
    else if (optionNum > 3){
        $("body").css('height', 30 + 3 * 18) ; // max height
    }
    else {
        $("body").css('height', 30 + optionNum * 18);
    }
}