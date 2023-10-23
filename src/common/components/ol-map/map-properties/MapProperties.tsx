'use client';

import { Badge, Text, Grid, GridItem, Center } from '@chakra-ui/react';
import { useAppSelector } from '@redux/hooks';

const MapProperties = () => {
  const viewProperties = useAppSelector((state) => state.map.viewProperties);
  const projection = useAppSelector((state) => state.map.projection);
  const { zoom, latlonCoords, resolution, rotation } = viewProperties;

  const splitCoords = latlonCoords.split(', ');
  const lat = splitCoords[0];
  const lon = splitCoords[1];

  return (
    <Grid templateColumns={'1fr'}>
      <GridItem order={{ base: 9, xl: 9 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'lg', xl: 'lg' }}
        >
          Resolution
        </Text>
      </GridItem>
      <GridItem order={{ base: 10, xl: 10 }}>
        <Center>
          <Badge
            width="80%"
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {resolution}
          </Badge>
        </Center>
      </GridItem>
      <GridItem order={{ base: 11, xl: 11 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'lg', xl: 'lg' }}
        >
          Rotation
        </Text>
      </GridItem>
      <GridItem order={{ base: 12, xl: 12 }}>
        <Center>
          <Badge
            width="80%"
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {rotation}
          </Badge>
        </Center>
      </GridItem>
      <GridItem order={{ base: 7, xl: 7 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'lg', xl: 'lg' }}
        >
          Zoom
        </Text>
      </GridItem>
      <GridItem order={{ base: 8, xl: 8 }}>
        <Center>
          <Badge
            width="80%"
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {zoom}
          </Badge>
        </Center>
      </GridItem>
      <GridItem order={{ base: 3, xl: 3 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'lg', xl: 'lg' }}
        >
          Latitude
        </Text>
      </GridItem>
      <GridItem order={{ base: 4, xl: 4 }}>
        <Center>
          <Badge
            width="80%"
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {lat}&deg;
          </Badge>
        </Center>
      </GridItem>
      <GridItem order={{ base: 5, xl: 5 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'lg', xl: 'lg' }}
        >
          Longitude
        </Text>
      </GridItem>
      <GridItem order={{ base: 6, xl: 6 }}>
        <Center>
          <Badge
            width="80%"
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {lon}&deg;
          </Badge>
        </Center>
      </GridItem>
      <GridItem order={{ base: 1, xl: 1 }}>
        <Text
          textAlign="center"
          color="tan.200"
          fontWeight="600"
          fontSize={{ base: 'md', xl: 'md' }}
        >
          Projection
        </Text>
      </GridItem>
      <GridItem order={{ base: 2, xl: 2 }}>
        <Center>
          <Badge
            width={'80%'}
            bg="tan.200"
            variant="solid"
            fontSize={{ base: 'md', xl: 'md' }}
            color="black"
            textAlign="center"
          >
            {projection}
          </Badge>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default MapProperties;
