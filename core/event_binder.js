/**
 * Created by polish on 2014.04.10..
 */

function init(){

    playorpause = 1;
    player =  document.querySelector('#main_player');
    setVolume();

    display = document.querySelector('.infobox');

    seeker = document.querySelector('.seeker');
    volume = document.querySelector('.volume');


    prevbtn = document.querySelector('.prevbutton');
    prevbtn.addEventListener('click',function(){
        prevbtn_click();
    });

    stopbtn = document.querySelector('.stopbutton');
    stopbtn.addEventListener('click',function(){
        stopbtn_click();
    });

    playbtn = document.querySelector('.playbutton');
    playbtn.addEventListener('click',function(){
        playbtn_click();
    });

    nextbtn = document.querySelector('.nextbutton');
    nextbtn.addEventListener('click',function(){
        nextbtn_click()
    });

    playlistbtn = document.querySelector('.openfilebutton');
    playlistbtn.addEventListener('click',function(){
        $('#mu_sic').click();
    });

    togglebtn = document.querySelector('.toggledrop');
    togglebtn.addEventListener('click', function(){
        togglebtn_click();
    });

    urlbtn = document.querySelector('.addurl');
    urlbtn.addEventListener('click', function(){
        urlbtn_click();
    });


    clrbtn = document.querySelector('.removeall');
    clrbtn.addEventListener('click', function(){
        playlist = [];
        reload_playlist();
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

   /// Bind on resize
    $(window).bind('resize',function(){
        if (($(window).height()-200)>10)
        $('.playlistbox').css('height',$(window).height()-200+'px');
    });



    $('.info').text('welcome to the chrome player');

}