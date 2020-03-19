import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import data from './mapData';
import ripple from './assets/ripple.svg';
import mapStyles from './mapStyles';
import InfoPopup from './components/InfoPopup';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Map = () => {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.793173, lng: 98.9898834 },
      zoom: 2,
      styles: mapStyles,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });

    const infowindow = new window.google.maps.InfoWindow();

    data.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const latLng = new window.google.maps.LatLng(coords[1], coords[0]);
      const marker = new window.google.maps.Marker({
        map,
        position: latLng,
        optimized: false,
        icon: ripple
      });

      marker.addListener('click', function() {
        infowindow.setContent(
          renderToString(<InfoPopup message={feature.properties.status} />)
        );
        infowindow.open(map, marker);
      });
    });
  }, []);

  return <MapContainer id="map" />;
};

export default Map;
