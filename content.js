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
    else if(message.action == "clearList"){
        clearlist();    
    }
    else if(message.action == "makeBorder"){
        makeBorder(message.value);    
    }
    else{
        scrollDivDown();
    }
}

function clickSeenButton(){
    let seenByButton = document.getElementsByClassName('_ac5n');
    let totalCount = seenByButton[0].children[0].innerHTML;
    seenByButton[0].click();
    chrome.runtime.sendMessage({'action':'setTotalCount','totalCount':totalCount});
    handleSomeDiv();
    
}

function scrollDivUp(){
    let divBox = document.getElementsByClassName('_ab8w  _ab94 _ab99 _ab9f _ab9m _ab9o  _ab9w');
    let child = divBox[0].children;
    for(let x = child[0].scrollHeight; x>0;x--){
        child[0].scrollTop = x;
    }
    child[0].scrollTop = -(child[0].scrollHeight);
    chrome.runtime.sendMessage({'action': 'searchBy', 'currentCount':0 });
}

function scrollDivDown(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = child[0].scrollHeight;
}

function moveToUser(height){
    let divBox = document.getElementsByClassName('_ab8w  _ab94 _ab99 _ab9f _ab9m _ab9o  _ab9w');
    let child = divBox[0].children;
    child[0].scrollTop = height;
}


function makeList(){

    let userLists = document.getElementsByClassName('_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8');
    for(user of userLists){
        addUserInList(user);
        
    }
    userLists[userLists.length-1].scrollIntoView();
    console.log(usernameList);
    chrome.runtime.sendMessage({'action': 'printUser', 'totalCount':usernameList.length });
    
}

function search(searchBy){
    let flag = true;
    console.log("seacj : "+searchBy);
    for(let x = 0;x<usernameList.length;x++){

        let child = usernameList[x].children;
        child = child[1].children;
        if(child[1] == null)
            continue;
        
        child = child[1].children; 
        if(child[0].innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            moveToUser(x*48);
            chrome.runtime.sendMessage({'action': "makeBorder",'searchBy':searchBy });
            flag = false;
            break;
        }
    }
    if(flag){
        chrome.runtime.sendMessage({'action': "visibleStatus",'value':true});
    }
    else{
        chrome.runtime.sendMessage({'action': "visibleStatus",'value':false});
    }
}

function makeBorder(searchBy){
    let flag = true;
    let userLists = document.getElementsByClassName('_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8');
    for(user of userLists){
        let child = user.children;
        child = child[1].children;
        if(child[1] == null)
            continue;
        
        child = child[1].children; 
        if(child[0].innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            let border = "background-image: repeating-linear-gradient(-7deg, #ff3333, #ff3333 12.74px, transparent 26px, transparent 29.43px, #ff3333 33px), repeating-linear-gradient(83deg, #ff3333, #ff3333 12.74px, transparent 26px, transparent 29.43px, #ff3333 33px), repeating-linear-gradient(173deg, #ff3333, #ff3333 12.74px, transparent 26px, transparent 29.43px, #ff3333 33px), repeating-linear-gradient(263deg, #ff3333, #ff3333 12.74px, transparent 26px, transparent 29.43px, #ff3333 33px); background-size: 2px 100%, 100% 2px, 2px 100% , 100% 2px; background-position: 0 0, 0 0, 100% 0, 0 100%; background-repeat: no-repeat; ";
            user.style = border;
            flag = false;
            break;
        }
    }
    if(flag){
        chrome.runtime.sendMessage({'action': "makeBorder",'searchBy':searchBy });
    }
}

function addUserInList(user){
    
    if(!usernameList.includes(user)){
        usernameList.push(user);
    }
    
}

function clearlist(){
    usernameList = [];
    scrollDivUp();
}

function handleSomeDiv(someDiv) { 
    console.log("div was handled");
    if(usernameList != null)
        makeList();
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const someDiv = document.getElementsByClassName("_ac78")[0];
    if (someDiv) {
        handleSomeDiv(someDiv);
        mutationInstance.disconnect();
    }
});


observer.observe(document, {
    childList: true,
    subtree:   true
});