var apiKey = 'Z5YYKIYYQG3NZEXWN';
var trackIDs = ['TRJJZCT1423E9092CE']
var trackURLs = ['static/lsd.mp3']

var remixer;
var player;
var tracks = [null];
var context = new webkitAudioContext();
var remixer = createJRemixer(context, $, apiKey);
var player = remixer.getPlayer()
var remixed = [];
var remixedIndex = 0;
var isPlaying = false;
var ret;




remixer.remixTrackById(trackIDs[0], trackURLs[0], function(t, percent){
    console.log(t,percent);
    if(percent == 100 && t.status == 'ok'){
      ret = t;
      for(var i = 0; i < t.analysis.beats.length; i++){
        console.log(i);
        remixed.push(t.analysis.beats[i]);
        i++;
      } 
      player.play(0,remixed);
    }
  });

