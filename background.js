
chrome.runtime.onInstalled.addListener(async () => {
  console.log('B-5: Directions extension is running');
});

chrome.runtime.onMessage.addListener( async function(request, sender, sendResponse) {

  chrome.storage.sync.get(request.event, (data) => {
    try {
      let shortcut = data[request.event];
      shortcurtDict[shortcut]()
      console.log(`${request.event} > ${shortcut}`)
    } catch (e) {
      console.error(e)
    }
  });

});