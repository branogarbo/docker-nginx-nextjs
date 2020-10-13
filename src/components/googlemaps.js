import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react'
import { useState } from 'react'

let mapStyle = {
   width: '800px',
   height: '600px'
};

let containerStyle = {
   width: mapStyle.width,
   height: mapStyle.height,
   position: 'relative'
};

function Map({google}) {
   let [markers,setMarkers] = useState([
      {
         position: {
            lat: 21.1,
            lng: -157.1
         }
      },
      {
         position: {
            lat: 21,
            lng: -157
         }
      },
      {
         position: {
            lat: 20,
            lng: -156
         }
      }
   ]);

   let addMarker = (ref, map, event) => {
      markers.push({
         position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
         }
      });

      setMarkers(markers);
   };

   return (
      <GoogleMap
      zoom={8}
      initialCenter={{ lat: 21, lng: -158 }}
      onClick={addMarker}
      google={google}
      style={mapStyle}
      containerStyle={containerStyle}>

         {markers.map(marker => <Marker position={{lat:marker.position.lat,lng:marker.position.lng}} />)}

      </GoogleMap>
   );
}

export default GoogleApiWrapper({
   apiKey: process.env.GOOGLE_MAPS_API_KEY,
   LoadingContainer: ()=> <b>Loading...</b>
})(Map);