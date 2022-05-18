chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage (message, sender, sendResponse){
    let paragraphs=document.getElementsByClassName('eebAO h_uhZ ');
    for (elt of paragraphs){
        elt.innerHTML=message.txt;
    }
    let seenByButton = document.getElementsByClassName('eVFA4');
    seenByButton[0].click();
    let userLists = document.getElementsByClassName('_7UhW9   xLCgt      MMzan    _0PwGv              fDxYl     ');
    // for(user of userLists){
    //     console.log(user.innerHTML);
    // }
    let lastUsername = '';
    let usernames = [];
    while(lastUsername != userLists[userLists.length-1]){
        console.log('before');
        wait(3000);  //7 seconds in milliseconds
        console.log('after');
        userLists[userLists.length-1].scrollIntoView();
        userLists = document.getElementsByClassName('_7UhW9   xLCgt      MMzan    _0PwGv              fDxYl     ');
        for(user of userLists){
            console.log(user.innerHTML);
        }
        console.log('before');
        wait(3000);  //7 seconds in milliseconds
        console.log('after');
        lastUsername = userLists[userLists.length-1];

    }
    
    
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }