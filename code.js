function sound(sound) {
  let aud = document.createElement("audio")
  aud.src = sound;
  aud.play();
} 
document.getElementById("btn").onclick = function() {
  alert("Emergency Meeting Calling")
  createRecord("game", {game:true}, function(record, success) {
    alert("Emergency Meeting Called")
  });
}
onRecordEvent("game", function(record, eventType) {
    sound('assets/emergency.mp3')
    navigator.vibrate(1000)
});
