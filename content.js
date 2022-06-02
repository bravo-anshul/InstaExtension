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
    let seenByButton = document.getElementsByClassName('_ac5n');
    let totalCount = seenByButton[0].children[0].innerHTML;
    console.log(totalCount);
    seenByButton[0].click();
    chrome.runtime.sendMessage({'action':'setTotalCount','totalCount':totalCount});
}


function makeList(){
    // let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    // let child = divBox[0].children;
    printUsers();
}

function scrollDivUp(){
    let divBox = document.getElementsByClassName('_ab8w  _ab94 _ab99 _ab9f _ab9m _ab9o  _ab9w');
    let child = divBox[0].children;
    console.log("child height : "+ (child[0].scrollHeight));
    for(let x = child[0].scrollHeight; x>0;x--){
        child[0].scrollTop = x;
    }
    //child[0].scrollTop = -(child[0].scrollHeight);
    chrome.runtime.sendMessage({'action': 'searchBy', 'currentCount':0 });
}

function scrollDiv(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = child[0].scrollHeight;
}

function printUsers(){

    let userLists = document.getElementsByClassName('_aacl _aaco _aacu _aacy _aada');
    for(user of userLists){
        addUserInList(user.innerHTML);
        
    }
    userLists[userLists.length-1].scrollIntoView();
    console.log(usernameList);
    chrome.runtime.sendMessage({'action': 'printUser', 'totalCount':usernameList.length });
    
}

function search(searchBy){
    let flag = true;
    let userLists = document.getElementsByClassName('_aacl _aaco _aacu _aacy _aada');
    for(user of userLists){
        if(user.innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            user.scrollIntoView();
            user.style.border = "thick solid red";
            user.style.border = "thick solid red";
            user.style.border = "thick solid red";
            flag = false;
            break;
        }
    }
    if(flag){
        userLists[userLists.length-1].scrollIntoView();
        chrome.runtime.sendMessage({'action': "searchBy",'searchBy':searchBy, 'currentCount':0 });
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