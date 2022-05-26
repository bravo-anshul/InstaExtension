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
    else if(message == "clickSeenButton"){
        let seenByButton = document.getElementsByClassName('eVFA4');
        var totalCount = seenByButton[0].children[0].innerHTML;
        console.log(totalCount);
        seenByButton[0].click();
    }
    else{
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
    // for(let x = 0; x<(child[0].scrollHeight);x++){
    //     //console.log("For loop scrolling");
    //     //child[0].scrollTop = x;   
         
    // }
    printUsers();
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
        
    }
    userLists[userLists.length-1].scrollIntoView();
    lastUsernmaeRecieved = userLists[userLists.length-1].innerHTML;
    console.log(usernameList);
    // if(lastUsernmaeRecieved != userLists[userLists.length - 1].innerHTML )
    //     chrome.runtime.sendMessage(userLists[userLists.length - 1].innerHTML);
    // else
    //     lastUsernmaeRecieved = userLists[userLists.length - 1].innerHTML;
}

function addUserInList(user){
    if(!usernameList.includes(user)){
        usernameList.push(user);
        console.log(usernameList.length);
    }
    // if(usernameList.length < 100);
    //    makeList();
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }