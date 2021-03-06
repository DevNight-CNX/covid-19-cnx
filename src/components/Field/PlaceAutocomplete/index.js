import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import { AutoComplete } from '../index.view';

const PlaceAutocompletePropTypes = {
  onChange: PropTypes.func
};

const PlaceAutocomplete = ({ onChange }) => {
  const [places, setPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const serviceRef = useRef();

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    serviceRef.current = service;
  }, []);

  const [debouncedCallback] = useDebouncedCallback(address => {
    if (!address) setIsFetching(false);

    const request = {
      query: address,
      radius: 150000,
      location: new window.google.maps.LatLng(18.791709, 98.983327)
    };

    serviceRef.current.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setIsFetching(false);
        setPlaces(
          results.map(result => {
            return {
              name: result.name,
              location: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
              },
              id: result.id
            };
          })
        );
      } else {
        setIsFetching(false);
        setPlaces([
          {
            name: 'ไม่พบข้อมูล',
            location: {
              lat: null,
              lng: null
            },
            id: null
          }
        ]);
      }
    });
  }, 500);

  return (
    <AutoComplete
      items={places}
      onChange={selection => {
        onChange(selection);
      }}
      onInputChange={inputValue => {
        debouncedCallback(inputValue);
        setIsFetching(true);
      }}
      isFetching={isFetching}
    />
  );
};

export default PlaceAutocomplete;

PlaceAutocomplete.propTypes = PlaceAutocompletePropTypes;
