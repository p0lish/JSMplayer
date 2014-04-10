

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