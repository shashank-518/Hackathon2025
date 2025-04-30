// import React, { useRef, useEffect } from 'react';
// import * as maptilersdk from '@maptiler/sdk';
// import "@maptiler/sdk/dist/maptiler-sdk.css";
// import './map.css';

// export default function Map() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const tokyo = { lng: 139.753, lat: 35.6844 };
//   const zoom = 14;
//   maptilersdk.config.apiKey = 'huStQ5ucUbzy1GpmsOtf';

//   useEffect(() => {
//     if (map.current) return; 

//     map.current = new maptilersdk.Map({
//       container: mapContainer.current,
//       style: maptilersdk.MapStyle.STREETS,
//       center: [tokyo.lng, tokyo.lat],
//       zoom: zoom
//     });

//   }, [tokyo.lng, tokyo.lat, zoom]);

// //   return (
//     <div className="map-wrap">
//       <div ref={mapContainer} className="map" />
//     </div>
//   );
// }