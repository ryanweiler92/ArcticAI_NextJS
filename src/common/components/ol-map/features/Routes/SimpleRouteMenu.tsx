'use client';

import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  setRouteToAddAction,
  setCloseSimpleRoutesMenuAction,
} from '@redux/slices/routesSlice';
import { Route } from '@redux/types';
import { transformCoordinatesPair } from '@utils/coordinateUtils';
import { useIsMobile } from '@hooks/hooks';

interface RouteProps {
  closeRoutesMenu: () => void;
  routesMenuOpen: boolean;
}

interface RouteLocations {
  name: string;
  coordinates: any;
  markerId: string;
}

const SimpleRouteMenu = ({ closeRoutesMenu, routesMenuOpen }: RouteProps) => {
  const markers = useAppSelector((state) => state.markers.markers);
  const menuClosed = useAppSelector(
    (state) => state.routes.closeSimpleRoutesMenu
  );

  const dispatch = useAppDispatch();
  const setRouteToAdd = (routeCoords: Route) => {
    dispatch(setRouteToAddAction(routeCoords));
  };
  const resetSimpleRoutesMenuRedux = () => {
    dispatch(setCloseSimpleRoutesMenuAction(false));
  };

  const [startLocation, setStartLocation] = useState<RouteLocations>({
    name: 'Select A Marker',
    coordinates: [0, 0],
    markerId: '',
  });
  const [endLocation, setEndLocation] = useState<RouteLocations>({
    name: 'Select A Marker',
    coordinates: [0, 0],
    markerId: '',
  });
  const [routesLoading, setRoutesLoading] = useState<boolean>(false);

  useEffect(() => {
    if (menuClosed) resetSimpleRoutesMenu();
  }, [menuClosed]);

  const isMobile = useIsMobile();

  // min number of markers required to make route
  const markerLimit = markers.length >= 2;

  // reset menu values after adding a route
  const resetSimpleRoutesMenu = () => {
    closeRoutesMenu();
    setRoutesLoading(false);
    setStartLocation({
      name: 'Select A Marker',
      coordinates: [0, 0],
      markerId: '',
    });
    setEndLocation({
      name: 'Select A Marker',
      coordinates: [0, 0],
      markerId: '',
    });
    resetSimpleRoutesMenuRedux();
  };

  const handleLocationSelect = (startOrEnd: string, marker: any) => {
    const { clientId, location, longitude, latitude } = marker;

    if (startOrEnd === 'start') {
      setStartLocation({
        name: location,
        coordinates: [longitude, latitude],
        markerId: clientId,
      });
    } else {
      setEndLocation({
        name: location,
        coordinates: [longitude, latitude],
        markerId: clientId,
      });
    }
  };

  const handleRouteSelection = async () => {
    setRoutesLoading(true);

    const { startCoords, endCoords } = transformCoordinatesPair(
      startLocation.coordinates,
      endLocation.coordinates,
      'EPSG:3857',
      'EPSG:4326'
    );

    const startName = startLocation.name.split(',')[0];
    const endName = endLocation.name.split(',')[0];
    const routeName = startName + ' TO ' + endName;
    const id = uuidv4();
    const color = '#DFFB25';
    const isAnimating = false;
    const markersIds = [startLocation.markerId, endLocation.markerId];

    const routeInfo = {
      startLat: startCoords[0],
      startLon: startCoords[1],
      endLat: endCoords[0],
      endLon: endCoords[1],
      routeName,
      id,
      color,
      isAnimating,
      startMarkerId: markersIds[0],
      endMarkerId: markersIds[1],
    };

    setRouteToAdd(routeInfo);
  };

  return (
    <Drawer
      isOpen={routesMenuOpen}
      placement="bottom"
      onClose={closeRoutesMenu}
    >
      <DrawerOverlay />
      <DrawerContent bg="brand.800">
        <DrawerCloseButton color="tan.200" />
        <DrawerHeader color="tan.200" textAlign="center">
          Select markers to create a route
        </DrawerHeader>
        <DrawerBody color="tan.200">
          <Flex width="100%" justify="center" flexDirection={isMobile ? "column" : "row"}>
            <Flex id="start-box" justify="center" mb={isMobile ? "4" : "0"}>
              <Badge
                variant="solid"
                bg="tan.200"
                color="brand.800"
                fontSize="1.2em"
                mr="2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80px"
              >
                Start
              </Badge>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg="brand.800"
                  borderColor="tan.200"
                  border="1px"
                  variant="outline"
                  width="300px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="tan.200"
                  _hover={{
                    bg: 'tan.200',
                    color: 'brand.800',
                  }}
                  _active={{
                    bg: 'tan.200',
                    color: 'brand.800',
                  }}
                  isDisabled={!markerLimit}
                >
                  {markerLimit
                    ? startLocation.name
                    : 'Requires 2 active markers'}
                </MenuButton>
                <MenuList bg="brand.800" borderColor="tan.200">
                  {markers.map((marker) => (
                    <MenuItem
                      key={marker.clientId}
                      onClick={() => handleLocationSelect('start', marker)}
                      bg="brand.800"
                      color="tan.200"
                    >
                      {marker.location}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Flex id="end-box" ml={!isMobile ? "4" : "0"} justify="center" mb={isMobile ? "4" : "0"}>
              <Badge
                variant="solid"
                bg="tan.200"
                color="brand.800"
                fontSize="1.2em"
                mr="2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80px"
              >
                END
              </Badge>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg="brand.800"
                  borderColor="tan.200"
                  border="1px"
                  variant="outline"
                  width="300px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="tan.200"
                  _hover={{
                    bg: 'tan.200',
                    color: 'brand.800',
                  }}
                  _active={{
                    bg: 'tan.200',
                    color: 'brand.800',
                  }}
                  isDisabled={!markerLimit}
                >
                  {markerLimit ? endLocation.name : 'Requires 2 active markers'}
                </MenuButton>
                <MenuList bg="brand.800" borderColor="tan.200">
                  {markers.map((marker) => (
                    <MenuItem
                      key={marker.clientId}
                      onClick={() => handleLocationSelect('end', marker)}
                      bg="brand.800"
                      color="tan.200"
                    >
                      {marker.location}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Flex ml="4" justify={isMobile ? "center" : ""}>
              <Button
                onClick={handleRouteSelection}
                colorScheme="green"
                isLoading={routesLoading}
              >
                Create Route
              </Button>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SimpleRouteMenu;
