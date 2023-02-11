function sound(sound) {
  let aud = document.createElement("audio")
  aud.src = sound;
  aud.play();
} 
document.getElementById("btn").onclick = function() {
  alert("Emergency Meeting Calling")
  updateRecord("game", {id:1, game:true}, function(record, success) {
    alert("Emergency Meeting Called")
  });
}
onRecordEvent("game", function(record, eventType) {
  if (eventType === 'update' && record.game == true) {
    sound('assets/emergency.mp3')
    setTimeout(function() {
      updateRecord("game", {id:1, game:false}, function(record, success) {
      });
    })
  }
});