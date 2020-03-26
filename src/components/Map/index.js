import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { prop } from 'ramda';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useNews } from 'contexts/news.context';
import { useReport } from 'contexts/report.context';
import useFirestore from 'utils/useFirestore';
import hospitalIcon from './assets/hospital.svg';
import newsIcon from './assets/news.svg';
import rippleIcon from './assets/ripple.svg';
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
  const { reports, fetching: reportsLoading } = useReport();

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
        const latLng = new window.google.maps.LatLng(lat, lng);
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

        const getTime = () => {
          const time = prop('seconds', newsItem.time);
          return moment.unix(time).fromNow() === 'Invalid date'
            ? null
            : moment.unix(time).fromNow();
        };

        const parsedItem = {
          ...newsItem,
          time: getTime()
        };

        marker.addListener('click', function() {
          infowindow.setContent(
            renderToString(<NewsPopup data={parsedItem} />)
          );
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

  useEffect(() => {
    if (reportsLoading) {
      return;
    }

    console.log('reports', reports);

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    reports
      .filter(report => report.type === 'news')
      .forEach(reportItem => {
        const coords = reportItem.location || [];

        const lat = coords[0];
        const lng = coords[1];

        if (lat && lng) {
          const latLng = new window.google.maps.LatLng(lat, lng);
          const marker = new window.google.maps.Marker({
            map,
            position: latLng,
            icon: newsIcon
          });

          markers.push(marker);

          const parsedItem = {
            newsLink: reportItem.link,
            unknownLocation: false,
            location: {
              lat: reportItem.location[0],
              lng: reportItem.location[1]
            },
            address: reportItem.address,
            title: reportItem.content,
            time: moment(reportItem.time).fromNow()
          };

          console.log('parsedItem', parsedItem);

          marker.addListener('click', function() {
            infowindow.setContent(
              renderToString(<NewsPopup data={parsedItem} />)
            );
            infowindow.open(map, marker);
          });
        }
      });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
      console.log('clear!');
    };
  }, [reportsLoading, reports]);

  useEffect(() => {
    if (reportsLoading) {
      return;
    }

    console.log('reports', reports);

    const map = mapRef.current;

    const infowindow = infoWindowRef.current;

    const markers = [];

    reports
      .filter(report => report.type === 'risk')
      .forEach(reportItem => {
        const coords = reportItem.location || [];

        console.log('coords', coords);

        const lat = coords[0];
        const lng = coords[1];

        if (lat && lng) {
          const latLng = new window.google.maps.LatLng(lat, lng);
          const marker = new window.google.maps.Marker({
            map,
            position: latLng,
            icon: rippleIcon
          });

          markers.push(marker);

          const parsedItem = {
            newsLink: reportItem.link,
            unknownLocation: false,
            location: {
              lat: reportItem.location[0],
              lng: reportItem.location[1]
            },
            address: reportItem.address,
            title: reportItem.content,
            time: moment(reportItem.time).fromNow()
          };

          marker.addListener('click', function() {
            infowindow.setContent(
              renderToString(<NewsPopup data={parsedItem} />)
            );
            infowindow.open(map, marker);
          });
        }
      });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
      });
      console.log('clear!');
    };
  }, [reportsLoading, reports]);

  return (
    <>
      <MapContainer id="map" />
      <IconDetail />
    </>
  );
};

export default Map;
