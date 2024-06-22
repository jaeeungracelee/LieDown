document.getElementById('start-meeting').addEventListener('click', () => {
    const meetingLink = prompt("Enter the meeting link:");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'manageMeeting', link: meetingLink });
    });
  });
  
  document.getElementById('end-meeting').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'leaveMeeting' });
    });
  });
  
  document.getElementById('record-meeting').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording' });
    });
  });
  
  document.getElementById('stop-recording').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' });
    });
  });
  