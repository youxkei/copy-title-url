function handleYoutubeURI(uri) {
    console.log(uri)
    if (uri.startsWith('https://www.youtube.com/watch?v=')) {
        return uri
            .replace(/&?list=[^&]+/g, '')
            .replace(/&?index=[^&]+/g, '')
            .replace(/&?start_radio=[^&]+/g, '')
            .replace(/&?t=[^&]+/g, '')
    }

    return uri
}

chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, async tabs => {
    const tab = tabs[0];

    const textArea = document.createElement('textarea');

    const title = tab.title.replace(/\[/g, '［').replace(/]/g, '］')
    const uri = handleYoutubeURI(tab.url)

    textArea.value = `[${title}](${uri})`;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
  });
});
