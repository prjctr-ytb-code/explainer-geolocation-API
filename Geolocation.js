export class Geolocation {
    #id;
    #options;
    #coords;

    constructor() {
        this.#coords = null;
        this.#id = null;
        this.#options = {
            enableHighAccuracy: true,
            timeout: 1000,
        };

        if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported by your browser");
        } else {
            this.#getCurrentUserPosition();
        }

        this.startTrackLocationButton = document.querySelector('#startTrackPosition');
        this.stopTrackLocationButton = document.querySelector('#stopTrackPosition');

        this.latitude = document.querySelector('.latitude');
        this.longitude = document.querySelector('.longitude');

        this.startTrackLocationButton.addEventListener('click', this.#startTrackUserPosition);
        this.stopTrackLocationButton.addEventListener('click', this.#cancelTrackUserPosition);
    }

    #onSuccess = (position) => {
        this.#coords = position.coords;
        this.latitude.innerText = `Latitude: ${position.coords.latitude}`;
        this.longitude.innerText = `Longitude: ${position.coords.longitude}`;
    }

    #onError = (errorCode) => {
        switch (errorCode) {
            case '1':
                throw new Error("Geolocation failed because the page didn't have the necessary permissions");
            case '2':
                throw new Error("Internal source of position returned an internal error");
            case '3':
                throw new Error("The time allowed to acquire the geolocation was reached before the information was obtained");
        }
    }

    #getCurrentUserPosition = () => {
        navigator.geolocation.getCurrentPosition(this.#onSuccess, this.#onError, this.#options);
    }

    #startTrackUserPosition = () => {
        this.#id = navigator.geolocation.watchPosition(this.#onSuccess, this.#onError);
    }

    #cancelTrackUserPosition = () => {
        navigator.geolocation.clearWatch(this.#id);
    }
}
