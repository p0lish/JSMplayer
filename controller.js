window.addEventListener('DOMContentLoaded', init);


function init() {
    playorpause = 1;
    player =  document.querySelector('#main_player');
    display = document.querySelector('.infobox');
    prevbtn = document.querySelector('.prevbutton');
    stopbtn = document.querySelector('.stopbutton');
    playbtn = document.querySelector('.playbutton');
    nextbtn = document.querySelector('.nextbutton');
    
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
        display.textContent ='event next button click';    
        });
    
    
    display.textContent ='welcome to the chrome player';
}


function prevbtn_click(){
    display.textContent ='event previous button click';        
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