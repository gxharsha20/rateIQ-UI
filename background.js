chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyze-rateiq",
    title: "Analyze with RateIQ",
    contexts: ["page", "link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyze-rateiq") {
    chrome.sidePanel.open({ tabId: tab.id });
  }
});
