/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    //predefined rules, gotten from the name of the button
    function nameToRules(name) {
      switch (name) {
        case "Caesar Cipher":
          return ["Rules", [{"from": "a", "to": "n"}, {"from": "b", "to": "o"}, {"from": "c", "to": "p"}, {"from": "d", "to": "q"}, {"from": "e", "to": "r"}, {"from": "f", "to": "s"}, {"from": "g", "to": "t"}, {"from": "h", "to": "u"}, {"from": "i", "to": "v"}, {"from": "j", "to": "w"}, {"from": "k", "to": "x"}, {"from": "l", "to": "y"}, {"from": "m", "to": "z"}, {"from": "n", "to": "a"}, {"from": "o", "to": "b"}, {"from": "p", "to": "c"}, {"from": "q", "to": "d"}, {"from": "r", "to": "e"}, {"from": "s", "to": "f"}, {"from": "t", "to": "g"}, {"from": "u", "to": "h"}, {"from": "v", "to": "i"}, {"from": "w", "to": "j"}, {"from": "x", "to": "k"}, {"from": "y", "to": "l"}, {"from": "z", "to": "m"}, {"from": "A", "to": "N"}, {"from": "B", "to": "O"}, {"from": "C", "to": "P"}, {"from": "D", "to": "Q"}, {"from": "E", "to": "R"}, {"from": "F", "to": "S"}, {"from": "G", "to": "T"}, {"from": "H", "to": "U"}, {"from": "I", "to": "V"}, {"from": "J", "to": "W"}, {"from": "K", "to": "X"}, {"from": "L", "to": "Y"}, {"from": "M", "to": "Z"}, {"from": "N", "to": "A"}, {"from": "O", "to": "B"}, {"from": "P", "to": "C"}, {"from": "Q", "to": "D"}, {"from": "R", "to": "E"}, {"from": "S", "to": "F"}, {"from": "T", "to": "G"}, {"from": "U", "to": "H"}, {"from": "V", "to": "I"}, {"from": "W", "to": "J"}, {"from": "X", "to": "K"}, {"from": "Y", "to": "L"}, {"from": "Z", "to": "M"}]];
        case "I to Me":
          return ["Rules", [{"from": "I", "to": "me"}]];
        case "Custom Input":
          //get a 2d array from the commma separated replacement pairs
          return ["Custom", document.getElementById("rules").value.split("\n").map(x => x.split(',')), null];
        case "Cat Links":
          return ["Cat Links", "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg"];
      }
      return [];
    }

    function change(tabs) {
      let [command, rules] = nameToRules(e.target.textContent);
      //send a message to the actual browser window with what we want it to execute
      browser.tabs.sendMessage(tabs[0].id, {
        command: command,
        rules: rules
      });
    }

    function reportError(error) {
      console.error(`Error in replacement: ${error}`);
    }

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(change).catch(reportError);
  });
}

/**
 * There was an error executing the script.
 * Display the popup"s error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn"t inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/insert_content.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

