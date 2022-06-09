
//document.getElementById("myButton").addEventListener("click", myFunction);
document.getElementById("search").addEventListener("click", search);
// document.getElementById("makeList").addEventListener("click", makeList);
// document.getElementById("clickSeenButton").addEventListener("click", clickSeenButton);

var totalUserCount ;

clickSeenButton();
// makeList();
console.log("total user count is " + totalUserCount);

document.getElementById("searchBox").addEventListener("keydown", function(event){
  console.log("key pressed");
  if (event.targetkey === "Enter") {
    search();
  }
});

function searchNew(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
    //chrome.tabs.sendMessage(tabs[0].id, {"action":"clearList"});
    //chrome.tabs.sendMessage(tabs[0].id, {"action":"clickSeenButton"});
    //chrome.tabs.sendMessage(tabs[0].id, {"action":"scrollTop"});
    chrome.tabs.sendMessage(tabs[0].id, {"action":"search"});
  }
}

function search(){
  var searchBy = document.getElementById("searchBox").value.toLowerCase();
  if(searchBy == '')
    return;
  console.log('search by : '+ searchBy);
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"action":"search","value":searchBy});
  }
}


function clickSeenButton(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"action":"clickSeenButton"});
    } 
}

function makeList(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"action":"makeList"});
  } 
}

function makeBorder(searchBy){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"action":"makeBorder","value":searchBy});
  } 
}

function setVisibleStatus(seenStatus){
  let seenStatusButton = document.getElementById("seen");
  seenStatusButton.style.display = "block";
  console.log("inside seem fuinction");
    if(!seenStatus){
      seenStatusButton.innerHTML = "SEEN";
      seenStatusButton.style.backgroundColor = "Green";
      
    }
    else{
      seenStatusButton.innerHTML = "NOT SEEN";
      seenStatusButton.style.backgroundColor = "RED";
    }
}


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){

  if(message.action == "searchBy" && message.currentCount < (totalUserCount)){
    console.log("search by functin called.");
    search();
  }
  else if(message.action == "printUser" ){
    console.log("totalCount recieved :"+message.totalCount);
    if(message.totalCount < (totalUserCount)){
      console.log("if called");
      makeList();
    }
  }
  else if(message.action == "setTotalCount"){
    totalUserCount = message.totalCount;
  }
  else if(message.action == "makeBorder"){
    makeBorder(message.searchBy);
  }
  else if(message.action == "visibleStatus"){
    setVisibleStatus(message.value);
  }

}


function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

