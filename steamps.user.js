// ==UserScript==
// @name         SteamPS
// @namespace    uchks
// @author       uchks
// @version      0.3
// @description  SteamPS (Steam Piracy Search), just a userscript that adds piracy search dl buttons.
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        https://store.steampowered.com/app/*
// @grant        none
// @license      MIT
// ==/UserScript==

const buttonSet = [
	{ url: "https://fitgirl-repacks.site/?s=", title: "FitGirl" },
	{ url: "https://dodi-repacks.site/?s=", title: "DODI" },
	{ url: "https://www.ovagames.com/?s=", title: "OVA Games" },
];

const createButton = (href, title) =>
	$("<a>", {
		class: "btn_green_steamui btn_medium",
		href,
        target: "_blank",
		css: {
			"text-decoration": "none",
			"font-size": "14px",
		},
	}).append($("<span>").text(title));

const addButtonsToPage = () => {
	if (!/https:\/\/store.steampowered.com\/app\/\d+/.test(window.location.href))
		return;

	const gamePurchaseActionBg = $(".game_purchase_action_bg").eq(0);
	const appName = $(".apphub_AppName").first().text().trim();

    if (!gamePurchaseActionBg.length || !appName) {
        console.error("[SteamPS] Failed to find game purchase section or app name.");
        return;
    }

	console.log(
		"%c[SteamPS]%c App Name:",
		"color:#2196F3; font-weight:bold;",
		"",
		appName,
	); // primarily for debugging purposes. had issues with appName.

	for (const { url, title } of buttonSet) {
		gamePurchaseActionBg.append(
			createButton(`${url}${encodeURIComponent(appName)}`, title),
		);
	}

	gamePurchaseActionBg.css({
		display: "right",
		"align-items": "center",
		gap: "2px",
		"flex-wrap": "nowrap",
		width: "fit-content",
	});
};

$(document).ready(addButtonsToPage);

$(document)
	.on("mouseenter", ".btn_green_steamui", function () {
		$(this).addClass("btn_active");
	})
	.on("mouseleave", ".btn_green_steamui", function () {
		$(this).removeClass("btn_active");
	});
