import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { prop } from 'ramda';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useNews } from 'contexts/news.context';
import { useReport } from 'contexts/report.context';
import { useScreeningPoint } from 'contexts/screeningPoint.context';
import useFirestore from 'utils/useFirestore';
import hospitalIcon from './assets/hospital.svg';
import newsIcon from './assets/news.svg';
import rippleIcon from './assets/ripple.svg';
import policeIcon from './assets/police.svg';
import mapStyles from './mapStyles';
import NewsPopup from './components/NewsPopup';
import CasePopup from './components/CasePopup';
import ScreeningPointPopup from './components/ScreeningPointPopup';
import IconDetail from './components/IconDetail';

const useGoogleMap = (mapId = 'map') => {
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById(mapId), {
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

  return {
    getMap: () => mapRef.current,
    getInfoWindow: () => infoWindowRef.current
  };
};

const usePinInMap = (
  markerRef,
  googleMap = {},
  render = () => null,
  [data, loading]
) => {
  const addMarkerToMap = (map, { lat, lng }) => {
    const sameLocationMarker = markerRef.current.find(
      ({ lat: markerLat, lng: markerLng }) => {
        return (
          Number(markerLat) === Number(lat) && Number(markerLng) === Number(lng)
        );
      }
    );

    let mapLat = lat;
    let mapLng = lng;

    if (sameLocationMarker) {
      mapLat = Number(lat) + 0.00012;
      mapLng = Number(lng) + 0.00012;
    }

    const latLng = new window.google.maps.LatLng(mapLat, mapLng);
    const marker = new window.google.maps.Marker({
      map,
      position: latLng,
      ...googleMap.marker
    });

    markerRef.current = [...markerRef.current, { lat: mapLat, lng: mapLng }];

    return marker;
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    const map =
      typeof googleMap.map === 'function' ? googleMap.map() : googleMap.map;

    const infowindow =
      typeof googleMap.infoWindow === 'function'
        ? googleMap.infoWindow()
        : googleMap.infoWindow;

    const markers = [];

    data.forEach((item, index) => {
      const coords = item.location;

      const lat = prop('lat', coords);
      const lng = prop('lng', coords);

      if (lat && lng) {
        const marker = addMarkerToMap(map, { lat, lng });

        markers.push(marker);

        marker.addListener('click', function() {
          infowindow.setContent(renderToString(render(item, index)));
          infowindow.open(map, marker);
        });
      }
    });

    return () => {
      markers.forEach(marker => {
        marker.setMap(null);
        markerRef.current = markerRef.current.filter(({ lat, lng }) => {
          return lat != marker.position.lat() || lng != marker.position.lng();
        });
      });
    };
  }, [loading, data]);
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const { news, newsLoading } = useNews();
  const { reports, fetching: reportsLoading } = useReport();
  const { screeningPoints, screeningPointsLoading } = useScreeningPoint();
  const markerRef = useRef([]);

  const { getMap, getInfoWindow } = useGoogleMap();

  const { data: cases, loading } = useFirestore(
    db => db.collection('cases_cnx'),
    item => ({
      ...item,
      unknownLocation: item.unknown_location
    })
  );

  usePinInMap(
    markerRef,
    {
      map: getMap,
      infoWindow: getInfoWindow,
      marker: {
        optimized: false,
        icon: hospitalIcon
      }
    },
    item => {
      return <CasePopup data={item} />;
    },
    [cases, loading]
  );

  usePinInMap(
    markerRef,
    {
      map: getMap,
      infoWindow: getInfoWindow,
      marker: {
        icon: newsIcon
      }
    },
    item => {
      const getTime = () => {
        const time = prop('seconds', item.date);
        return moment.unix(time).fromNow() === 'Invalid date'
          ? null
          : moment.unix(time).fromNow();
      };

      const parsedItem = {
        ...item,
        time: getTime()
      };
      return <NewsPopup data={parsedItem} />;
    },
    [news, newsLoading]
  );

  usePinInMap(
    markerRef,
    {
      map: getMap,
      infoWindow: getInfoWindow,
      marker: {
        icon: newsIcon
      }
    },
    item => {
      const parsedItem = {
        newsLink: item.link,
        unknownLocation: false,
        location: {
          lat: item.location[0],
          lng: item.location[1]
        },
        address: item.address,
        title: item.content,
        time: moment(item.date).fromNow(),
        type: item.type,
        id: item.id
      };
      return <NewsPopup data={parsedItem} />;
    },
    [
      reports
        .filter(report => report.type === 'news')
        .map(item => {
          return {
            ...item,
            location: {
              lat: prop(0, item.location),
              lng: prop(1, item.location)
            }
          };
        }),
      reportsLoading
    ]
  );

  usePinInMap(
    markerRef,
    {
      map: getMap,
      infoWindow: getInfoWindow,
      marker: {
        icon: rippleIcon
      }
    },
    item => {
      const parsedItem = {
        newsLink: item.link,
        unknownLocation: false,
        location: {
          lat: item.location[0],
          lng: item.location[1]
        },
        address: item.address,
        title: item.content,
        time: moment(item.date).fromNow(),
        type: item.type,
        id: item.id
      };
      return <NewsPopup data={parsedItem} />;
    },
    [
      reports
        .filter(report => report.type === 'risk')
        .map(item => {
          return {
            ...item,
            location: {
              lat: prop(0, item.location),
              lng: prop(1, item.location)
            }
          };
        }),
      reportsLoading
    ]
  );

  usePinInMap(
    markerRef,
    {
      map: getMap,
      infoWindow: getInfoWindow,
      marker: {
        icon: {
          url: policeIcon,
          size: new window.google.maps.Size(24, 24)
        }
      }
    },
    (item, index) => {
      const parsedItem = {
        ...item,
        order: index + 1
      };
      return <ScreeningPointPopup data={parsedItem} />;
    },
    [screeningPoints, screeningPointsLoading]
  );

  return (
    <>
      <MapContainer id="map" />
      <IconDetail />
    </>
  );
};

export default Map;
