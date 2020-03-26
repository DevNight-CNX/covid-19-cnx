import React, { useEffect, useRef, useState } from 'react';
import { prop } from 'ramda';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useNews } from 'contexts/news.context';
import useFirestore from 'utils/useFirestore';
import hospitalIcon from './assets/hospital.svg';
import newsIcon from './assets/news.svg';
import mapStyles from './mapStyles';
import CasePopup from './components/CasePopup';
import NewsPopup from './components/NewsPopup';
import IconDetail from './components/IconDetail';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const { news, newsLoading } = useNews();

  const { data: cases, loading } = useFirestore(
    db => db.collection('cases_cnx'),
    item => ({
      ...item,
      unknownLocation: item.unknown_location
    })
  );

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.818218, lng: 98.9855059 },
      zoom: 11,
      styles: mapStyles,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      gestureHandling: 'cooperative',
      restriction: {
        latLngBounds: {
          north: 19.370793,
          south: 18.4548,
          west: 98.521096,
          east: 99.342739
        },
        strictBounds: true
      }
    });

    const infowindow = new window.google.maps.InfoWindow();

    mapRef.current = map;
    infoWindowRef.current = infowindow;
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    cases.forEach(caseItem => {
      const coords = caseItem.location;

      const lat = prop('lat', coords);
      const lng = prop('lng', coords);

      if (lat && lng) {
        const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
        const marker = new window.google.maps.Marker({
          map,
          position: latLng,
          optimized: false,
          icon: hospitalIcon
        });

        markers.push(marker);

        marker.addListener('click', function() {
          infowindow.setContent(renderToString(<CasePopup data={caseItem} />));
          infowindow.open(map, marker);
        });
      }
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [loading, cases]);

  useEffect(() => {
    if (newsLoading) {
      return;
    }

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    news.forEach(newsItem => {
      const coords = newsItem.location;
      const lat = prop('lat', coords);
      const lng = prop('lng', coords);

      if (lat && lng) {
        const latLng = new window.google.maps.LatLng(lat, lng);
        const marker = new window.google.maps.Marker({
          map,
          position: latLng,
          icon: newsIcon
        });

        markers.push(marker);

        marker.addListener('click', function() {
          infowindow.setContent(renderToString(<NewsPopup data={newsItem} />));
          infowindow.open(map, marker);
        });
      }
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
    };
  }, [newsLoading, news]);

  return (
    <>
      <MapContainer id="map" />
      <IconDetail />
    </>
  );
};

export default Map;
