import {Geolocation} from './Geolocation.js';

(() => {
    const readyState = document.readyState;

    if (readyState === 'interactive' || readyState === "complete") {
        new Geolocation();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            new Geolocation();
        });
    }
})();
