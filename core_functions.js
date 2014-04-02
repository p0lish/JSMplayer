
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

    /// Bind a function, if the current song is ended.
    $('#main_player').bind('ended',function(){
        goto_next();
    });


    /// Bind functions if the playing is active.
    $('#main_player').bind('timeupdate',function(){
        $('.time').html(reformat_playtime(this.duration)+' | '+reformat_playtime(this.currentTime));
        $('.seeker').slider('value',player.currentTime);
        setSeeker();
    });

    $('.info').text('welcome to the chrome player');
}

function prevbtn_click(){
    if (playlist.length!==0){
        currentPointer = (currentPointer === 0) ? 0:parseInt(currentPointer)-1;
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
            player.play();
        
        }
        update_displays();
    }
}

function nextbtn_click(){
    if (playlist.length!==0){
        currentPointer = (currentPointer === playlist.length) ? playlist.length:parseInt(currentPointer)+1;
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
    $('.playlistbox div').unbind('dblclick');
    $('.playlistbox div').unbind('click');
    $('.playlistbox div').dblclick(function(){
        $('.playlistbox div').removeClass('current');
        $(this).addClass('current');
        currentPointer = $(this).attr('id');
        create_source_item();
        update_displays();
        player.play();
        playbtn.textContent = '||';
    });
    $('.playlistbox div').click(function(){
        $('.playlistbox div').removeClass('current');
        $(this).addClass('current');
        
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
            player.play();

        }

    }
}

function setVolume(){
    player.volume = $('.volume').slider('value')/100;
}

function setSeeker(){
    $('.seeker').slider({
        max: player.duration,
        value:player.currentTime,
        step:0.1,
        animate: true,
        stop: setPos
    });
}

function setPos(){
    player.currentTime = $('.seeker').slider('value');   
}