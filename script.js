chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, async tabs => {
    const tab = tabs[0];

    const textArea = document.createElement('textarea');
    textArea.value = `[${tab.title.replace(/\[/g, '［').replace(/]/g, '］')}](${tab.url})`;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
  });
});
