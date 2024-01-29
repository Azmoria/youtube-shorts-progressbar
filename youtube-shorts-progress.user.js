// ==UserScript==
// @name         youtube shorts progress bar
// @namespace    https://github.com/Azmoria/youtube-shorts-progressbar/
// @version      0.3
// @description  adds the ability to scan through youtube shorts on pc
// @author       Azmoria
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let cssStyles = `<style id='youtube-shorts-progress' type="text/css">
    .overlay.ytd-reel-video-renderer #overlay{
        pointer-events: auto;
    }
    body #progress-bar{
       pointer-events: auto !important;
    }
    .style-scope.ytd-reel-player-header-renderer {
        color: #FFF;
        text-shadow: 1px 1px #000;
        text-transform: capitalize;
    }
    </style>`
    $('#youtube-shorts-progress').remove();
    $('html').append(cssStyles);

    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) return

            for (let i = 0; i < mutation.addedNodes.length; i++) {
                // do things to your newly added nodes here
                let node = mutation.addedNodes[i]
                if ( $('[role="progressbar"]').length>0){
                   addProgressClick()
                }
            }
        })
    })

    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    })

   function addProgressClick(){
    $('[role="progressbar"]').off('click.progress').on('click.progress', function(e){
        let video = $(this).parents('#player-container').find('#player video.video-stream')[0];
        let duration = video.duration;
        let x = e.pageX - $(this).offset().left
        let clickedValue = x / this.offsetWidth;
        let currentTime = duration * clickedValue;
        video.currentTime = currentTime;
    })

   $('body').off('keydown.progress').on('keydown.progress', function(e){
        let video = $('#player video.video-stream')[0];
       let currentTime = video.currentTime;
       switch(e.which) {
           case 37: // left
               currentTime -= 2;
               break;

           case 39: // right
               currentTime += 2;
               break;

           default: return; // exit this handler for other keys
       }
      video.currentTime = currentTime;
   })


   }

})();
