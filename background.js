chrome.commands.onCommand.addListener(() => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true
    },
    async tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "copy_title_url" },
        function() {
          chrome.runtime.lastError;
        }
      );
    }
  );
});
