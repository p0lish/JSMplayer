window.addEventListener('DOMContentLoaded', init);

/// define global variables
var currentApp = chrome.app.window.current();
var closedheight = currentApp.getBounds()['height'];
var playlist = [];
var currentPointer = 0;
var continousPlaying = true;
var playorpause = 1;

/// BOOT SETUP
$('.playlistbox').css('height','300px');
$('.volume').slider({
    max:100,
    value:50,
    slide: setVolume,
    change: setVolume
});
$('.seeker').slider({});
$('#mu_sic').on('change',function (){
    $.each($('#mu_sic')[0].files,function(){
        playlist.push(this);
    });
    reload_playlist();
});
