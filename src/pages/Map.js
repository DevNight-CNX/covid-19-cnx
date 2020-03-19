import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import data from './mapData';
import pin from './confirmed.svg';

const InfoPopupWrapper = styled.div`
  background-color: red;
`;

const InfoPopupText = styled.p`
  color: #fff;
`;

const InfoPopup = ({ message }) => {
  return (
    <InfoPopupWrapper>
      <InfoPopupText>Hello {message}</InfoPopupText>
    </InfoPopupWrapper>
  );
};

const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
];

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Map = () => {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 18.793173, lng: 98.9898834 },
      // zoom: 13.3,
      zoom: 2,
      styles: mapStyles
    });

    const infowindow = new window.google.maps.InfoWindow();

    console.log(
      'svgAnimated',
      `data:image/svg+xml;charset=UTF-8;base64,${svgAnimated}`
    );

    data.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const latLng = new window.google.maps.LatLng(coords[1], coords[0]);
      const marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        optimized: false,
        icon: pin
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
