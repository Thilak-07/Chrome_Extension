chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Successfully Installed.")
});

chrome.browserAction.onClicked.addListener((tab) => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();
    document.execCommand("paste");
    const clipboardText = input.value;
    console.log(clipboardText);
    sendJSON(clipboardText);
    document.body.removeChild(input);
});

function sendJSON(clipboardText) {
	// Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Converting JSON data to string
    var data = JSON.stringify({ "clip": clipboardText});

    // Sending data with the request
    xhr.send(data);
}

