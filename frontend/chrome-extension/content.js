// join the GoogleMeets 
function joinGoogleMeet(meetingLink) {
    console.log('Joining meeting...');
    window.location.href = meetingLink;
  
    window.onload = () => {
      // wait for the page to load and join the meeting
      const joinButton = document.querySelector("button[aria-label='Join now']");
      if (joinButton) {
        joinButton.click();
      }
    };
}

// leave the GoogleMeets
function leaveGoogleMeet() {
    console.log('Leaving meeting...');
    const leaveButton = document.querySelector("button[aria-label='Leave call']");
    if (leaveButton) {
        leaveButton.click();
    }
}

// start recording the meeting
let mediaRecorder;
let recordedChunks = [];

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            mediaRecorder.start();
        })
        .catch(error => {
            console.error("Error accessing media devices.", error);
        });
}

// stop recording the meeting
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'meeting-recording.webm';
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }
}

// use Whisper API for speech-to-text? - DANIEL I NEED U
async function transcribeAudio(blob) {
    const formData = new FormData();
    formData.append('file', blob);

    const response = await fetch('YOUR_WHISPER_API_ENDPOINT', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data.transcription;
}

// use LLM for generating responses
async function generateResponse(context) {
    const response = await fetch('YOUR_LLM_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context })
    });
    const data = await response.json();
    return data.response;
}

// function to handle the meeting lifecycle
async function handleMeeting() {
    startRecording();

    // ex: handle responses and actions during the meeting
    mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
            const transcription = await transcribeAudio(event.data);
            const response = await generateResponse(transcription);

            // generate and play the response
            const utterance = new SpeechSynthesisUtterance(response);
            window.speechSynthesis.speak(utterance);
        }
    };
}

// function to manage the entire meeting lifecycle
async function manageMeeting(meetingLink) {
    await joinGoogleMeet(meetingLink);
    await handleMeeting();
    
    // leave the meeting after a certain duration or based on a condition
    setTimeout(() => {
        leaveGoogleMeet();
        stopRecording();
    }, 3600000); // ex: leave after 1 hour
}

// listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'joinMeeting') {
        joinGoogleMeet(request.link);
    } else if (request.action === 'leaveMeeting') {
        leaveGoogleMeet();
    } else if (request.action === 'startRecording') {
        startRecording();
    } else if (request.action === 'stopRecording') {
        stopRecording();
    } else if (request.action === 'handleMeeting') {
        handleMeeting();
    } else if (request.action === 'manageMeeting') {
        manageMeeting(request.link);
    }
});
