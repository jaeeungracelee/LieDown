chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
  
  // logic to join meetings, record, etc.
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
