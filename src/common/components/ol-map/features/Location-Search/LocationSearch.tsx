'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import axios from 'axios';
import { fromLonLat } from 'ol/proj';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@redux/hooks';
import {
  setMarkerToAddAction,
  setMarkersAction,
} from '@redux/slices/markersSlice';
import { Marker } from '@redux/types';

interface Location {
  isCollection: boolean;
  magicKey: string;
  text: string;
}

const LocationSearch = () => {
  const dispatch = useAppDispatch();
  const setMarkerToAdd = (marker: Marker) => {
    dispatch(setMarkerToAddAction(marker));
  };
  const setMarkers = (marker: Marker) => {
    dispatch(setMarkersAction(marker));
  };

  const testKey = process.env.NEXT_PUBLIC_TEST_KEY;

  const [search, setSearch] = useState<String>('');
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const targetRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuOpen(true);
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = async () => {
    console.log(testKey);
    setMenuOpen(true);
    const result = await axios(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${search}&f=json`
    );
    setLocations(result.data.suggestions);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleLocationSelection = async (event: any) => {
    const magicKey = event.target.value;

    const result = await axios(
      `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${magicKey}&f=json`
    );

    const location = result.data.candidates[0].address;
    const coordinates = result.data.candidates[0].location;
    const { x, y } = coordinates;
    const uniqueID = uuidv4();

    const mercatorCoords = fromLonLat([x, y]);

    const markerToAdd = {
      clientId: uniqueID,
      location,
      longitude: mercatorCoords[0],
      latitude: mercatorCoords[1],
    };

    setMarkerToAdd(markerToAdd);
    setMarkers(markerToAdd);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!targetRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [targetRef]);

  return (
    <Flex
      justifyContent={'center'}
      flexDirection="column"
      style={{ zIndex: 1000 }}
    >
      <Menu
        placement="bottom"
        isOpen={menuOpen}
        closeOnBlur={true}
        autoSelect={false}
        initialFocusRef={targetRef}
      >
        <InputGroup>
          <Input
            id="search-input"
            color="tan.200"
            placeholder="Search for locations"
            _placeholder={{ opacity: 0.7, color: 'tan.200' }}
            focusBorderColor="tan.200"
            borderColor="tan.200"
            onFocus={() => setMenuOpen(true)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={targetRef}
          />
          <InputRightElement
            // eslint-disable-next-line react/no-children-prop
            children={
              <IconButton
                aria-label="search"
                size="sm"
                icon={<Search2Icon />}
                color="tan.200"
                bg="brand.800"
                onClick={handleSubmit}
                _hover={{ bg: 'tan.200', color: 'brand.800' }}
              />
            }
          />
        </InputGroup>
        <MenuButton></MenuButton>
        {locations?.length > 0 && (
          <MenuList bg="brand.800" borderColor="tan.200">
            {locations?.map((location, index) => (
              <MenuItem
                bg="brand.800"
                color="tan.200"
                key={index}
                value={location.magicKey}
                onClick={(event) => handleLocationSelection(event)}
              >
                {location.text}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>
    </Flex>
  );
};

export default LocationSearch;
