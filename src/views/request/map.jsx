import React, { useState } from 'react';
import axios from 'axios';

const GeocodeComponent = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };


  const getCoordinates = async () => {
    try {
      // const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=66680783c6c92291874574lnv60a620`);
      const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1Ijoia2ltYmFva3NxcDEyMyIsImEiOiJjbHhhNzJybzIwdzZkMmtwdWJxNmp1ZGdlIn0.Qkc_14dObPnUv611SknG4Q`);

      if (response.data.length > 0) {
        const data = response.data[0];
        setCoordinates({ lat: data.lat, lon: data.lon });
        setError('');
      } else {
        setError('No results found');
        setCoordinates({ lat: '', lon: '' });
      }
    } catch (error) {
      console.error('Error fetching the geocode data', error);
      setError('Error fetching the geocode data');
      setCoordinates({ lat: '', lon: '' });
    }
  };

  return (
    <div>
      <h1>Geocode Finder</h1>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter address"
      />
      <button onClick={getCoordinates}>Get Coordinates</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coordinates.lat && coordinates.lon && (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lon}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodeComponent;
