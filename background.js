chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    async (tabs) => {
      console.log(command);
      chrome.tabs.sendMessage(tabs[0].id, { action: command }, function () {
        chrome.runtime.lastError;
      });
    }
  );
});
