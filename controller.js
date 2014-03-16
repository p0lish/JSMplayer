window.addEventListener('DOMContentLoaded', init);
/// Prototype declarations
String.prototype.reformatPlaytime = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
var currentApp = chrome.app.window.current();
var closedheight = currentApp.getBounds()['height'];
var playlist = [];
var currentPointer = 0;
var continousPlaying = true;

function init() {
    playorpause = 1;
    player =  document.querySelector('#main_player');
    display = document.querySelector('.infobox');
    prevbtn = document.querySelector('.prevbutton');
    stopbtn = document.querySelector('.stopbutton');
    playbtn = document.querySelector('.playbutton');
    nextbtn = document.querySelector('.nextbutton');
    playlistbtn = document.querySelector('.playlistbutton');
    seeker = document.querySelector('.seeker');
    volume = document.querySelector('.volume');

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







    $('#main_player').bind('ended',function(){
        goto_next();
    });

    $('#main_player').bind('timeupdate',function(){
        $('.time').html(reformat_playtime(this.currentTime)+' | '+reformat_playtime(this.duration));
    });




    $('.info').text('welcome to the chrome player');
}


function prevbtn_click(){
    if (playlist.length!==0){
        currentPointer = (currentPointer === 0) ? 0:currentPointer-1;
        create_source_item();
        update_displays();
        if (playorpause !=0) {
            playbtn.textContent = '>';
            playorpause =1;
            player.pause();
        }
        else{
            playbtn.textContent = '||';
            playorpause =0;
            setSeeker();
            player.play();
        }
    }

    /// DEBUG SECTION
    console.log(currentPointer);
    console.log(playlist[currentPointer]);

}
function stopbtn_click(){
    player.pause();
    player.currentTime = 0;
    playbtn.textContent = '>';
    playorpause =1;
}
function playbtn_click(){
    if (playlist.length!==0){
        if ($('audio source').length === 0)
            create_source_item();
        if (playorpause ==0) {
            playbtn.textContent = '>';
            playorpause =1;
            player.pause();
        }
        else{
            playbtn.textContent = '||';
            playorpause =0;
            setSeeker();
            player.play();
        
        }
        update_displays();
    }

}
function nextbtn_click(){
    if (playlist.length!==0){
        currentPointer = (currentPointer === playlist.length) ? playlist.length:currentPointer+1;
        create_source_item();
        update_displays();
        if (playorpause !=0) {
            playbtn.textContent = '>';
            playorpause =1;
            player.pause();
        }
        else{
            playbtn.textContent = '||';
            playorpause =0;
            setSeeker();
            player.play();
        }
    }

    /// DEBUG SECTION
    console.log(currentPointer);
    console.log(playlist[currentPointer]);


}
function playlistbtn_click(){
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
function update_displays(){
    $('.playlistitem').removeClass('current');
    $('.playlistitem#'+currentPointer).addClass('current');
    $('.info').text($('.playlistitem#'+currentPointer).text());
}
function goto_next(){
    if (continousPlaying){
        if (playlist.length!==0){
            currentPointer = (currentPointer === playlist.length) ? playlist.length:currentPointer+1;
            create_source_item();
            update_displays();
            setSeeker();
            player.play();

        }

    }
}
function reformat_playtime(input){
    input = Math.round(input);
    return input.toString().reformatPlaytime();
}

function setVolume(){
    player.volume = $('.volume').slider('value')/100;
}

function setSeeker(){
    $('.seeker').slider({
        max: player.duration,
        value: 0,
        slide: setPos,
        change: setPos
    });
}

function setPos(){
    player.currentTime = $('.seeker').slider('value');   
}





/// BOOT SETUP
$('.playlistbox').css('height','100px');
$('.volume').slider({
    max:100,
    value:50,
    slide: setVolume,
    change: setVolume
});
$('.seeker').slider();
$('#mu_sic').on('change',function (){
    $.each($('#mu_sic')[0].files,function(){
        playlist.push(this);
    });

    reload_playlist();
});
