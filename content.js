chrome.runtime.onMessage.addListener(gotMessage);
var lastUsernmaeRecieved;
var usernameList = [];
function gotMessage (message, sender, sendResponse){
    if(message.action == "scrollTop"){
        scrollDivUp();
    }
    else if(message.action == "makeList"){
        makeList();
    }
    else if(message.action == "search"){
        search(message.value);
    }
    else if(message.action == "clickSeenButton"){
        clickSeenButton();    
    }
    else{
        scrollDiv();
    }
}

function clickSeenButton(){
    let seenByButton = document.getElementsByClassName('eVFA4');
    let totalCount = seenByButton[0].children[0].innerHTML;
    console.log(totalCount);
    seenByButton[0].click();
    chrome.runtime.sendMessage({'totalCount':totalCount});
}


function makeList(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    printUsers();
}

function scrollDivUp(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = -(child[0].scrollHeight);
    chrome.runtime.sendMessage({'search': 'searchBy', 'currentCount':0 });
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
        
    }
    userLists[userLists.length-1].scrollIntoView();
    lastUsernmaeRecieved = userLists[userLists.length-1].innerHTML;
    console.log(usernameList);
    chrome.runtime.sendMessage(usernameList.length);
    
}

function search(searchBy){
    let flag = true;
    let userLists = document.getElementsByClassName('_7UhW9   xLCgt      MMzan    _0PwGv              fDxYl     ');
    for(user of userLists){
        if(user.innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            user.scrollIntoView();
            //user.style.border = "width: 150px;height: 150px;text-align:center;border-top: 5px solid; border-image:   linear-gradient(to right, grey 25%, yellow 25%, yellow 50%,red 50%, red 75%, teal 75%) 5;";
            user.style.border = "thick solid red";
            flag = false;
            break;
        }
    }
    if(flag){
        userLists[userLists.length-1].scrollIntoView();
        chrome.runtime.sendMessage({'search': searchBy, 'currentCount':usernameList.length });
    }
}

function addUserInList(user){
    
    if(!usernameList.includes(user)){
        usernameList.push(user);
        //console.log({'currentCount':usernameList.length});
    }
    
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }