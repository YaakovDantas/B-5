/*VARIABLES*/

let shortcurtDict = {
  'new-tab': newTab,
  'close-tab': closeTab,
  'next-tab': nextTab,
  'back-tab': backTab,
}

const UP = `&#8593;`
const DOWN = `&#8595;`
const LEFT = `&#8592;`
const RIGHT = `&#8594;`

const gestures_dict = {
  'up' : UP,
  'down' : DOWN,
  'left' : LEFT,
  'right' : RIGHT,
}


/*COMMOM*/

function getGestures(events) {
  cont = 1
  dict_gestures = {}
  past = '#'
  gestures = []
  threshold = 5

  for (let index = 0; index < events.length +1; index++) {
      e = events[index]
      if (e != past ) {
          k = index - 1 < 0 ? 0 : index - 1
          key = `${events[k]}-${index}`
          dict_gestures[key] = cont
          cont = 1
      } else {
          cont++
      }
      past = e
  }

  for (const [key, value] of Object.entries(dict_gestures)) {
      if (value > threshold) {
          gestures.push(key.split('-')[0])
      }
  }

  return gestures
}



/*CHROME SHORTCUTS*/

function newTab() {
  chrome.tabs.create({url: 'chrome://newtab'})
}

async function closeTab() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.remove(tab.id)
}

async function nextTab() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let tabs = await chrome.tabs.query({windowId : tab.windowId});
  const nextIndex = tab.index + 1 >= tabs.length ? 0 : tab.index + 1 ;
  
  chrome.tabs.highlight({
    windowId: tab.windowId,
    tabs: nextIndex
  })
}

async function backTab() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let tabs = await chrome.tabs.query({windowId : tab.windowId});
  const backIndex = tab.index - 1 < 0 ? tabs.length - 1 : tab.index - 1 ;
  
  chrome.tabs.highlight({
    windowId: tab.windowId,
    tabs: backIndex
  })
}
