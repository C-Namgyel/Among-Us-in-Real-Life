function sound(sound) {
  let aud = document.createElement("audio")
  aud.src = sound;
  aud.play();
}
function message(placeHolder, enableSeconds, id) {

    let div = document.createElement("div")

    div.style.width = "65%"
    div.style.position = "fixed"
    div.style.top = "0%"
    div.style.left = "12.5%"
    div.style.borderStyle = "solid"
    div.style.borderWidth ="1px"
    div.style.borderRadius = "15px"
    div.style.backgroundColor = "white"
    div.style.zIndex = "99999"
    div.style.padding ="5%"
    let label = document.createElement("label")
    label.innerHTML = placeHolder,
    label.style.display = "inline-block"
    label.style.width = "100%";
    let ok = document.createElement("button");
    ok.style.width = "25%"
    ok.innerHTML = "OK (" + enableSeconds + "s)"
    ok.style.float = "right"
    ok.style.borderStyle = "none"
    ok.style.backgroundColor = "white"
    ok.disabled = true;
    if (id != undefined) {
        ok.id = id
    }
    div.appendChild(label)
    div.appendChild(document.createElement("br"))
    div.appendChild(document.createElement("br"))
    div.appendChild(ok)
    document.body.appendChild(div)
    div.style.top = (((window.getComputedStyle(document.body).height).slice(0,this.length - 2) / 2) - (div.clientHeight / 2)) + "px"
    document.getElementById("barrier2").hidden = false;
    if (enableSeconds < 0) {
        ok.hidden = true;
    } else if (enableSeconds == 0) {
        ok.innerHTML = "OK"
        ok.hidden = false;
        ok.disabled = false;
    } else {
        let CDNum = enableSeconds;
        let CD = setInterval(function() {
            CDNum -= 1;
            ok.innerHTML = "OK (" + CDNum + "s)"
            if (CDNum <= 0) {
                ok.disabled = false;
                ok.innerHTML = "OK";
                clearInterval(CD);
            }
        }, 1000)
    }
    ok.onclick = function() {
        div.remove()
        document.getElementById("barrier2").hidden = true;
    }
}
var username = prompt("Enter your username")
document.getElementById("btn").onclick = function() {
  alert("Emergency Meeting Calling")
  createRecord("game", {game: username}, function(record, success) {
    alert("Emergency Meeting Called")
  });
}
onRecordEvent("game", function(record, eventType) {
    message(record.username + " Called the meeting")
    sound('assets/emergency.mp3')
    navigator.vibrate(1000)
});
