
document.getElementById("myButton").addEventListener("click", myFunction);

function myFunction() {
    let params={
        active: true,
        currentWindow: true
      }
      chrome.tabs.query(params, gotTabs);
      function gotTabs(tabs){
          console.log("asfasf");
        let msg={
          txt: "hello"
        }
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
}