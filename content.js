chrome.runtime.onMessage.addListener(gotMessage);
var lastUsernmaeRecieved;
var usernameList = [];
function gotMessage (message, sender, sendResponse){
    if(message == "scrollTop"){
        console.log("scrolling up");
        scrollDivUp();
    }
    else if(message == "makeList"){
        console.log("Make list called");
        makeList();
    }
    else{
        console.log("username recieved from popup"+ message);
        lastUsernmaeRecieved = message;
        let paragraphs=document.getElementsByClassName('eebAO h_uhZ ');
        for (elt of paragraphs){
            elt.innerHTML=message.txt;
        }
        let seenByButton = document.getElementsByClassName('eVFA4');
        //seenByButton[0].click();
        //printUsers();
        scrollDiv();
        // chrome.runtime.sendMessage("got message from content script", function(response){
        //     console.log(response.farewell);
        // });
    }
}

function makeList(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    console.log("child Box height"+ (child[0].scrollHeight));
    for(let x = 0; x<(child[0].scrollHeight);x+=10){
        console.log("For loop scrolling");
        child[0].scrollTop = x;   
        printUsers(); 
    }

}

function scrollDivUp(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = -(child[0].scrollHeight);
}

function scrollDiv(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = child[0].scrollHeight;
}

function printUsers(){
    
    let userLists = document.getElementsByClassName('_7UhW9   xLCgt      MMzan    _0PwGv              fDxYl     ');
    for(user of userLists){
        addUserInList(user.innerHTML);
        //console.log(user.innerHTML);
        user.scrollIntoView();
    }
    console.log(usernameList);

    // if(lastUsernmaeRecieved != userLists[userLists.length - 1].innerHTML )
    //     chrome.runtime.sendMessage(userLists[userLists.length - 1].innerHTML);
    // else
    //     lastUsernmaeRecieved = userLists[userLists.length - 1].innerHTML;
}

function addUserInList(user){
    if(!usernameList.includes(user))
        usernameList.push(user);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }