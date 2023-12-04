// ==UserScript==
// @name         SteamPS
// @namespace    uchks
// @author       uchks
// @version      0.1
// @description  SteamPS (Steam Piracy Search), just a userscript that adds piracy search dl buttons. 
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        https://store.steampowered.com/app/*
// @grant        none
// @license      MIT
// ==/UserScript==

var buttonSet = [
    { url: "https://fitgirl-repacks.site/?s=", title: "FitGirl" },
    { url: "https://dodi-repacks.site/?s=", title: "DODI" },
    { url: "https://www.ovagames.com/?s=", title: "OVA Games" }
];

(function() {
    'use strict';

    if (!/https:\/\/store.steampowered.com\/app\/\d+/.test(window.location.href)) return;

    var gamePurchaseAction = $(".game_purchase_action_bg").eq(0);
    var appName = $(".apphub_AppName").first().text().trim();

    console.log( '%c[SteamPS]%c App Name:', 'color:#2196F3; font-weight:bold;', '', appName ); // primarily for debugging purposes. had issues with appName.

    gamePurchaseAction.css({
        "height": "auto",
        "max-width": "500px",
        "max-height": "40px",
        "overflow": "hidden",
        "white-space": "nowrap"
    });

buttonSet.forEach(function(el) {
    gamePurchaseAction.append(furnishLink(el.url + encodeURIComponent(appName), el.title));
});
})();

function furnishLink(href, innerHTML) {
    return $('<a>', {
        class: 'btn_green_steamui btn_medium',
        href: href,
        css: {
            'background-color': 'rgb(92, 126, 16)',
            'margin': '2px',
            'text-decoration': 'none'
        }
    }).append($('<span>').text(innerHTML));
}

$(document).on('mouseenter', '.btn_green_steamui', function() {
    $(this).css('background-color', '#67c1f5');
}).on('mouseleave', '.btn_green_steamui', function() {
    $(this).css('background-color', 'rgb(92, 126, 16)');
});
