'use client';

import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useMapContext } from '@context/MapContext';
import { useAppSelector } from '@redux/hooks';
import { gptRequest } from '@handlers/apiHandlers';
import proj4 from 'proj4';

const initialResults = [
  {
    clientId: '444441',
    longitude: -78.50798,
    latitude: 38.0336,
    location: 'University of Virginia',
  },
  {
    clientId: '15675',
    longitude: -80.42352,
    latitude: 37.22838,
    location: 'Virginia Tech',
  },
  {
    clientId: '1373',
    longitude: -77.30714,
    latitude: 38.83076,
    location: 'George Mason University',
  },
];

const ConsoleTester = () => {
  const { map } = useMapContext();
  const authenticated = useAppSelector((state) => state.user.isAuthenticated);
  const { routes } = useAppSelector((state) => state.routes);

  const testFunction = async () => {
    // const prompt = "Can you send me the coordinates of all of the major colleges in the state of Virginia? Please send them in a list (array) of objects that follows the format of [{ name: 'college name', lon: 'longitude here' lat: 'latitude here'}]."
    // const response = await gptRequest(prompt)

    // gpt still giving us geographic coords
    const source = 'EPSG:4326';
    const destination = 'EPSG:3857';
    const coordinates = [-78.50798, 38.0336];
    const [lon, lat] = proj4(source, destination, coordinates);
    console.log(lon, lat);
  };

  return (
    <Flex justifyContent="center" align="center" minHeight="10vh">
      <Button bg="tan.200" onClick={testFunction}>
        Console
      </Button>
    </Flex>
  );
};

export default ConsoleTester;
