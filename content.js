function getTitle() {
  if (document.URL.startsWith("https://www.youtube.com/watch?v=")) {
    return document.querySelector("#info-contents h1.title yt-formatted-string")
      .textContent;
  }

  return document.title;
}

function getURL() {
  if (document.URL.startsWith("https://www.youtube.com/watch?v=")) {
    return document.URL.replace(/&?list=[^&]+/g, "")
      .replace(/&?index=[^&]+/g, "")
      .replace(/&?start_radio=[^&]+/g, "")
      .replace(/&?t=[^&]+/g, "");
  }

  return document.URL;
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "copy_title_url") {
    const title = getTitle()
      .replace(/\[/g, "［")
      .replace(/]/g, "］");
    const url = getURL();

    const titleURL = `[${title}](${url})`;

    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = titleURL;
      document.body.appendChild(textArea);

      textArea.select();
      document.execCommand("copy");

      document.body.removeChild(textArea);
    } else {
      navigator.clipboard.writeText(titleURL);
    }
    sendResponse();

    return true;
  }
});
