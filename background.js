// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

initEnvOnInstall();
addKeyboardShortcutListener();

function addKeyboardShortcutListener(){
  chrome.commands.onCommand.addListener(function(command) {
    if (command === 'toggle_highlight') {
      //TODO: Pop up input text bar
      //TODO: Input prev text. Mark previous attribute if exist

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.storage.sync.get(["isMarked"], function(items) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "toggle_highlight", isMarked:items.isMarked}, null);
        });
      });
    }
  });
}

function initEnvOnInstall() {
  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({isMarked: false}, null);
  });
}