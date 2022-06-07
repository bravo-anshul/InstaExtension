
//document.getElementById("myButton").addEventListener("click", myFunction);
document.getElementById("search").addEventListener("click", search);
document.getElementById("search").addEventListener("keypress", searchNew);
document.getElementById("makeList").addEventListener("click", makeList);
document.getElementById("replace").addEventListener("click", replaceDiv);
document.getElementById("clickSeenButton").addEventListener("click", clickSeenButton);

var lastusername = '';
var totalUserCount ;


document.getElementById("searchBox").addEventListener("keydown", function(){
  if (event.targetkey === "Enter") {
    searchNew();
  }
});

function myfunctionNew(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
    console.log("lastUsername is pop up script :"+lastusername)
      chrome.tabs.sendMessage(tabs[0].id, "scrollTop");
  }
}


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

function replaceDiv(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"action":"replaceDiv"});
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

function myFunction() {
    let params={
        active: true,
        currentWindow: true
      }
      chrome.tabs.query(params, gotTabs);
      function gotTabs(tabs){
        console.log("lastUsername is pop up script :"+lastusername)
          chrome.tabs.sendMessage(tabs[0].id, lastusername);
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

}


function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

