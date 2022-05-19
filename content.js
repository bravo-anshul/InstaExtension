chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage (message, sender, sendResponse){
    let paragraphs=document.getElementsByClassName('eebAO h_uhZ ');
    for (elt of paragraphs){
        elt.innerHTML=message.txt;
    }
    let seenByButton = document.getElementsByClassName('eVFA4');
    //seenByButton[0].click();
    let userLists = document.getElementsByClassName('_7UhW9   xLCgt      MMzan    _0PwGv              fDxYl     ');
    for(user of userLists){
        console.log(user.innerHTML);
    }
    let lastUsername = '';
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    
    let child = divBox[0].children;
    child[0].scrollTop = child[0].scrollHeight;
    
    
    
    
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }