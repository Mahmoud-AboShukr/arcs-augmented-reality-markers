/**
 * Bootstrap for the ARCS engine in a browser environment.
 * It relies on require.js to get the job done.
 * @file
 */
"use strict";

// basically, here we start by importing the module ARCS
import ARCS from './arcs.js';


console.log("[ARCS] Bootstrapping...");

var baseUrl, appDescription, requireMarkup, xhr;

requireMarkup = document.querySelector('[data-arcsapp]');
if (requireMarkup !== undefined) {
        baseUrl = requireMarkup.dataset.baseUrl ;
        appDescription = requireMarkup.dataset.arcsapp || "arcsapp.json";    
}


(async function toto() {
var description = await(fetch(appDescription));
var applicationObject = await(description.json());


console.log("[ARCS] Application description loaded");

var aap = new ARCS.Application();
aap.import(applicationObject);
aap.start();
})();