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
        search3(message.value);
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
        scrollDiv();
    }
}

function clickSeenButton(){
    let seenByButton = document.getElementsByClassName('_ac5n');
    let totalCount = seenByButton[0].children[0].innerHTML;
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
    for(let x = child[0].scrollHeight; x>0;x--){
        child[0].scrollTop = x;
    }
    child[0].scrollTop = -(child[0].scrollHeight);
    chrome.runtime.sendMessage({'action': 'searchBy', 'currentCount':0 });
}

function printheight(height){
    let divBox = document.getElementsByClassName('_ab8w  _ab94 _ab99 _ab9f _ab9m _ab9o  _ab9w');
    let child = divBox[0].children;
    child[0].scrollTop = height;
}

function scrollDiv(){
    let divBox = document.getElementsByClassName('             qF0y9          Igw0E     IwRSH      eGOV_       acqo5  vwCYk                                                                                lDRO1                               ');
    let child = divBox[0].children;
    child[0].scrollTop = child[0].scrollHeight;
}

function printUsers(){

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
    let userLists = document.getElementsByClassName('_aacl _aaco _aacu _aacy _aada');
    
    for(user of userLists){
        if(user.innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            for(let x=0;x<50;x++)
                user.style.border = "thick solid red";
            flag = false;
            break;
        }
    }
    if(flag){
        //console.log(usernameList);
        userLists[userLists.length-1].scrollIntoView();
        chrome.runtime.sendMessage({'action': "searchBy",'searchBy':searchBy, 'currentCount':usernameList.length });
    }
}

function search2(searchBy){
    let flag = true;
    let userLists = document.getElementsByClassName('_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8');
    for(user of userLists){
        addUserInList(user);
        let child = user.children;
        child = child[1].children;
        if(child[1] == null)
            continue;
        
        child = child[1].children; 
        if(child[0].innerHTML.toLowerCase().includes(searchBy)){
            console.log("userFound");
            user.scrollIntoView();
            child[0].style.border = "thick solid red";
            flag = false;
            break;
        }
    }
    if(flag){
        //console.log(usernameList);
        userLists[userLists.length-1].scrollIntoView();
        console.log(usernameList.length);
        chrome.runtime.sendMessage({'action': "searchBy",'searchBy':searchBy, 'currentCount':usernameList.length });
    }
}

function search3(searchBy){
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
            printheight(x*48);
            chrome.runtime.sendMessage({'action': "makeBorder",'searchBy':searchBy });
            flag = false;
            break;
        }
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
            user.style.border = "thick solid red";
            flag = false;
            break;
        }
    }
    if(flag){
        //console.log(usernameList);
        chrome.runtime.sendMessage({'action': "makeBorder",'searchBy':searchBy });
    }
}

function addUserInList(user){
    
    if(!usernameList.includes(user)){
        usernameList.push(user);
        //console.log({'currentCount':usernameList.length});
    }
    
}

function clearlist(){
    usernameList = [];
    usernameList[0] = "start";
    scrollDivUp();
}
