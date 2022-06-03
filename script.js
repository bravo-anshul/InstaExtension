
//document.getElementById("myButton").addEventListener("click", myFunction);
document.getElementById("search").addEventListener("click", searchNew);
document.getElementById("search").addEventListener("keypress", searchNew);
document.getElementById("makeList").addEventListener("click", makeList);
document.getElementById("clickSeenButton").addEventListener("click", clickSeenButton);

var lastusername = '';
var totalUserCount ;


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
  console.log("Click press working");
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {"action":"scrollTop"});
    chrome.tabs.sendMessage(tabs[0].id, {"action":"clickSeenButton"});
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

  if(message.action == "searchBy" && message.currentCount <= (totalUserCount-5)){
    console.log("search by functin called.");
    search();
  }

  else if(message.action == "printUser" ){
    console.log("totalCount recieved :"+message.totalCount);
    if(message.totalCount < (totalUserCount-5)){
      console.log("if called");
      makeList();
    }
  }
  else if(message.action == "setTotalCount"){
    totalUserCount = message.totalCount;
  }
  // else if(message <= 122){
  //   console.log("last username recieved : "+message);
  //   makeList();
  // }

}


function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

