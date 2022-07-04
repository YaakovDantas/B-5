var myBodt = document.getElementsByTagName('body')[0]

delete Hammer.defaults.cssProps.userSelect;

var hammerBody = new Hammer(myBodt);

hammerBody.get('pan').set({ direction: Hammer.DIRECTION_ALL });

let events = [];

hammerBody.on("panleft panright panup pandown panend", (ev) => {
    if (ev.type != 'panend') {
        events.push(ev.type)
    } 
    if (ev.type == 'panend') {
        events.push(ev.type)
        
        callAction(getGestures(events))
        events = []
    }
});

function callAction(gestures) {
    chrome.runtime.sendMessage({
        event: gestures.join('-').replace(/pan/g,''),
    }, function(response) {
        if(response) console.log(response);
    })
}

