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
    if (enableSeconds < 0) {
        ok.hidden = true;
    } else if (enableSeconds == 0 || enableSeconds == undefined) {
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
    }
}
var username = prompt("Enter your username")
var time = 600
document.getElementById("start").onclick = function() {
    document.getElementById("start").disabled = true
    let timer = setInterval(function() {
        time -= 1;
        document.getElementById("start").innerHTML = time
        if (time <= 0) {
            clearInterval(timer)
            time = 600
            document.getElementById("start").disabled = false
            document.getElementById("start").innerHTML = "Start"
            navigator.vibrate(10000)
        }
    }, 1000)
}
document.getElementById("btn").onclick = function() {
    document.getElementById("btn").disabled = true;
    setTimeout(function() {
        document.getElementById("btn").disabled = false;
    }, 10000)
  document.getElementById("btn").disabled = true;
  message("Emergency Meeting Calling", 0)
  sound('assets/emergency.mp3')
  navigator.vibrate(1000)
  createRecord("game", {game: username}, function(record, success) {
      message("Emergency Meeting Called", 0)
      document.getElementById("btn").disabled = false;
  });
}
onRecordEvent("game", function(record, eventType) {
    if (record.game != username) {
        message(record.game + " called the meeting")
        sound('assets/emergency.mp3')
        navigator.vibrate(1000)
    }
});
