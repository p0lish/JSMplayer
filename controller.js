window.addEventListener('DOMContentLoaded', init);
var currentApp = chrome.app.window.current();
var closedheight = currentApp.getBounds()['height'];
var playlist = [];
var currentPointer = 0;

function init() {
    playorpause = 1;
    player =  document.querySelector('#main_player');
    display = document.querySelector('.infobox');
    prevbtn = document.querySelector('.prevbutton');
    stopbtn = document.querySelector('.stopbutton');
    playbtn = document.querySelector('.playbutton');
    nextbtn = document.querySelector('.nextbutton');
    playlistbtn = document.querySelector('.playlistbutton');

    prevbtn.addEventListener('click',function(){
        prevbtn_click();
        });
    
    stopbtn.addEventListener('click',function(){
        stopbtn_click();
        });
    
    playbtn.addEventListener('click',function(){
        playbtn_click();
        });
    
    nextbtn.addEventListener('click',function(){
       nextbtn_click()
        });

    playlistbtn.addEventListener('click',function(){
        playlistbtn_click();
    });
    
    
    display.textContent ='welcome to the chrome player';
}


function prevbtn_click(){
    currentPointer -= 1;
    create_source_item();
    if (playorpause !=0) {
        playbtn.textContent = '>';
        playorpause =1;
        player.pause();
    }
    else{
        playbtn.textContent = '||';
        playorpause =0;
        player.play();

    }
}
function stopbtn_click(){
    player.pause();
    player.currentTime = 0;
    playbtn.textContent = '>';
    playorpause =1;
}
function playbtn_click(){
    if (playorpause ==0) {
        playbtn.textContent = '>';
        playorpause =1;
        player.pause();
    }
    else{
        playbtn.textContent = '||';
        playorpause =0;
        player.play();
        
    }
}
function nextbtn_click(){
    currentPointer += 1;
    create_source_item();
    if (playorpause !=0) {
        playbtn.textContent = '>';
        playorpause =1;
        player.pause();
    }
    else{
        playbtn.textContent = '||';
        playorpause =0;
        player.play();

    }
}
function playlistbtn_click(){
    display.textContent ='playlist button clicked';
    if (closedheight === currentApp.getBounds()['height']){
        currentApp.resizeTo(currentApp.getMaxWidth(),currentApp.getMaxHeight());
        $('.playlistbox').css('height','600');
    }else{
        currentApp.resizeTo(currentApp.getMinWidth(),currentApp.getMinHeight());
    }
}
function reload_playlist(){
    $.each(playlist,function(index){
       $('.playlistbox').append('<div id="'+index+'" class="playlistitem">'+this.name+'</div>');
    });
}
function create_source_item(){
    audio_url  = URL.createObjectURL(playlist[currentPointer]);
    type = playlist[currentPointer].type;
    $('#main_player').empty();
    $('#main_player').append('<source src="'+audio_url+'" type="'+type+'" />');
}
/// BOOT SETUP

$('.playlistbox').css('height','100px');

$('#mu_sic').on('change',function ()
{
    $.each($('#mu_sic')[0].files,function(){
        playlist.push(this);
    });

    reload_playlist();
});
