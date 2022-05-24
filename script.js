
document.getElementById("myButton").addEventListener("click", myFunction);
document.getElementById("myTopButton").addEventListener("click", myfunctionNew);
document.getElementById("makeList").addEventListener("click", makeList);

var lastusername = '';
var count = 0;

function myfunctionNew(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
    console.log("lastUsername is pop up script :"+lastusername)
    //for(let x =0;x<5;x++){
      chrome.tabs.sendMessage(tabs[0].id, "scrollTop");
    //   wait(4000);
    // }
}
}


function makeList(){
  let params={
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs);
  function gotTabs(tabs){
    console.log("lastUsername is pop up script :"+lastusername)
    //for(let x =0;x<5;x++){
      chrome.tabs.sendMessage(tabs[0].id, "makeList");
    //   wait(4000);
    // }
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
        //for(let x =0;x<5;x++){
          chrome.tabs.sendMessage(tabs[0].id, lastusername);
        //   wait(4000);
        // }
    }
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
  
  if(lastusername != message){
    myFunction();
    lastusername = message;
    console.log("last username is "+ message);
    console.log(" count is "+ count);

    count+=1;
  }
  else if (count < 1000){
    myFunction();
    lastusername = message;
    count+=1;

  }
    

  console.log(message);
}


function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}