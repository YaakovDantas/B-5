var myElement = document.getElementById('gestures');

var gestures = new Hammer(myElement);

gestures.get('pan').set({ direction: Hammer.DIRECTION_ALL });

let events = [];
let user_gestures = [];
let pattern = document.getElementById('pattern');

gestures.on("panleft panright panup pandown panend", function(ev) {
  if (ev.type != 'panend') {
      events.push(ev.type)
  } 
  if (ev.type == 'panend') {
    events.push(ev.type)
    user_gestures = getGestures(events)
    printGestures(user_gestures)
    events = []
  }
});

let save = document.getElementById("save");
save.addEventListener('click', saveShortcut)

function printGestures(gestures) {
  pattern.innerHTML = ''

  for (const gesture of gestures) {
    pattern.innerHTML += gestures_dict[gesture.replace('pan', '')]
  }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  listShortcuts()
});

function saveShortcut() {
    if (user_gestures.length <= 0) {
      alert('Make a pattern before save it!')
      return
    }
    let select = document.getElementById("select");
    shortcurt = select.value
  
    let key = user_gestures.join('-').replace(/pan/g,'');
  
    let key_short = {}
    key_short[key] = shortcurt
  
    chrome.storage.sync.set(key_short);
  
    pattern.innerHTML = ''
    user_gestures = []

    alert('Gesture with shortcut saved!')
}

function listShortcuts() {
  chrome.storage.sync.get(null, (items) => {

    if (Object.entries(items).length < 1) return

    let table = document.getElementById('table');
    table.style.display = ''
    let tbody = document.getElementById('table-body');

    tbody.innerHTML = makeBodyContent(items);

    for (let [key, value] of Object.entries(items)) {
      document.getElementById(key).addEventListener('click', deleteShortchut);
    }
  })
}

function makeBodyContent(items) {
  let bodyContent = ''
  for (let [key, value] of Object.entries(items)) {
    icon = ''
    for (const gesture of key.split('-')) {
      icon += gestures_dict[gesture]
    }

    bodyContent += `
        <tr>
          <td class="arrow">${icon}</td>
          <td>${value}</td>
          <td id="${key}"><a href="#">Delete</a></td>
        </tr>`;
  }
  return bodyContent;
}

function deleteShortchut() {
  chrome.storage.sync.remove(this.id)
  listShortcuts()
}

listShortcuts()
