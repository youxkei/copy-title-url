function getTitle() {
  if (document.URL.startsWith("https://www.youtube.com/watch")) {
    return (
      document.querySelector("#info-contents h1.title yt-formatted-string")
        .textContent + " - YouTube"
    );
  }

  if (document.URL.startsWith("https://twitter.com/")) {
    return document.title.replace(/^\(\d+\) /g, "");
  }

  return document.title;
}

function getURL() {
  if (document.URL.startsWith("https://www.youtube.com/watch")) {
    return document.URL.replace(/&?list=[^&]+/g, "")
      .replace(/&?index=[^&]+/g, "")
      .replace(/&?start_radio=[^&]+/g, "")
      .replace(/&?t=[^&]+/g, "")
      .replace(/&?feature=[^&]+/g, "")
      .replace(/&?time_continue=[^&]+/g, "");
  }

  return document.URL;
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);
  } else {
    navigator.clipboard.writeText(text);
  }
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  switch (request.action) {
    case "copy-title-url": {
      const title = getTitle().replace(/\[/g, "［").replace(/]/g, "］");
      const url = getURL();

      const titleURL = `[${title}](${url})`;

      copyToClipboard(titleURL);
      sendResponse();

      return true;
    }

    case "copy-url": {
      const url = getURL();

      copyToClipboard(url);
      sendResponse();

      return true;
    }
  }
});
