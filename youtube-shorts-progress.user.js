// ==UserScript==
// @name         youtube shorts progress bar
// @namespace    https://github.com/Azmoria/youtube-shorts-progressbar/
// @version      0.7
// @description  adds the ability to scan through youtube shorts on pc
// @author       Azmoria
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @downloadURL  https://github.com/Azmoria/youtube-shorts-progressbar/raw/main/youtube-shorts-progress.user.js
// @updateURL    https://github.com/Azmoria/youtube-shorts-progressbar/raw/main/youtube-shorts-progress.user.js
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
    #progress-bar-line:hover,
    #progress-bar-line:hover div{
       height: 5px;
    }
    </style>`
    $('#youtube-shorts-progress').remove();
    $('html').append(cssStyles);

  


    $('html').off('click.progress').on('click.progress', '[role="progressbar"]', function(e){
        let video = $(this).parents('#player-container').find('#player video.video-stream[loop]')[0];
        let duration = video.duration;
        let x = e.pageX - $(this).offset().left
        let clickedValue = x / this.offsetWidth;
        let currentTime = duration * clickedValue;
        video.currentTime = currentTime;
    });
    $('html').off('keydown.progress').on('keydown.progress', function(e){
        let video = $('#player video.video-stream[loop]')[0];
        let currentTime = video.currentTime;
        switch(e.which) {
            case 37: // left
                currentTime -= 2;
                video.currentTime = currentTime;
                break;
            case 187: //= or numpad +
            case 107:
                video.volume += 0.05
                break;
            case 39: // right
                currentTime += 2;
                video.currentTime = currentTime;
                break;
            case 189:
            case 109://- or numpad -
                video.volume -= 0.05
                break;

            default: return; // exit this handler for other keys
        }
    });




})();
