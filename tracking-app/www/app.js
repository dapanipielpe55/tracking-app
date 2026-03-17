import { BackgroundGeolocation } from '@capacitor-community/background-geolocation';

function getParam(name){
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}

const vehiculo_id = getParam('vehiculo_id') || 1;

function iniciar(){

    document.getElementById('estado').innerText = "Iniciando...";

    BackgroundGeolocation.addWatcher(
    {
        requestPermissions: true,
        stale: false,
        distanceFilter: 10
    },
    (location, error) => {

        if(error){
            document.getElementById('estado').innerText = "Error GPS";
            return;
        }

        let lat = location.latitude;
        let lng = location.longitude;

        document.getElementById('estado').innerText =
            "Lat: "+lat+" Lng: "+lng;

        fetch('https://tracking.quimiforen.com/api/tracking/store.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                vehiculo_id:vehiculo_id,
                lat:lat,
                lng:lng,
                velocidad:location.speed || 0
            })
        });

    });

}

window.iniciar = iniciar;