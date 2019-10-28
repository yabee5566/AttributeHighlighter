// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
$(function() {
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
        alert("autocomplete option selected. inputText: "+inputText+ "selected");
    }
  });

  $("#searchTextInput").keyup(function (event) {
    if(event.keyCode == 13 || event.which == 13){ // enter key
        let inputText = $("#searchTextInput").val();
        alert("enter keyup. inputText: "+inputText);
    }
  });

});