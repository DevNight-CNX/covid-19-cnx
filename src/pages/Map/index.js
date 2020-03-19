import React, { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import useFetch from 'utils/useFetch';
import { getCases } from 'services/case';
import ripple from './assets/ripple.svg';
import mapStyles from './mapStyles';
import InfoPopup from './components/InfoPopup';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Map = () => {
  const mapRef = useRef(null);
  const { data: cases, loading } = useFetch(() => getCases(), null, []);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.7918218, lng: 98.9855059 },
      zoom: 14.24,
      styles: mapStyles,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: 'greedy',
      restriction: {
        latLngBounds: {
          north: 18.835952,
          south: 18.734216,
          west: 98.931837,
          east: 99.077914
        },
        strictBounds: true
      }
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const map = mapRef.current;

    const infowindow = new window.google.maps.InfoWindow();

    cases.forEach(caseItem => {
      const coords = caseItem.location;
      const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
      const marker = new window.google.maps.Marker({
        map,
        position: latLng,
        optimized: false,
        icon: ripple
      });

      marker.addListener('click', function() {
        infowindow.setContent(renderToString(<InfoPopup data={caseItem} />));
        infowindow.open(map, marker);
      });
    });
  }, [loading]);

  return <MapContainer id="map" />;
};

export default Map;
