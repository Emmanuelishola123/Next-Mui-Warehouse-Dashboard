import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl,
} from "react-map-gl";
import { useState } from "react";
import { mapBox } from "src/config";


function MapBox() {
    const [lng, setLng] = useState(54.37585762735543);
    const [lat, setLat] = useState(24.45677614934833);

    return (
        <>   
            <Map
                mapboxAccessToken={'pk.eyJ1IjoidG9sdXRpb24xMDEiLCJhIjoiY2xmMG5ycGg0MDBhNjN2cDhrOHRtazYxOSJ9.MAsbDswXfeUzEJMxNaoR6g'}
                style={{
                    width: "500px",
                    height: "320px",
                    borderRadius: "8px",
                    // border: "1px solid red",
                }}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 10
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={lng} latitude={lat} />
                <NavigationControl position="bottom-right" />
                <FullscreenControl />
                <GeolocateControl />
            </Map>
        </>
    );
}

export default MapBox;