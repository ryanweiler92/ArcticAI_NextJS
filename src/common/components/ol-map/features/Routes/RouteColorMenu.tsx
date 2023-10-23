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
  Button,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  openColorMenuAction,
  setRouteToAddAction,
  removeRouteAction,
  setColorLoadingAction,
} from '@redux/slices/routesSlice';
import { Route } from '@redux/types';
import { useMapContext } from '@context/MapContext';

const RouteColorMenu = () => {
  const colorMenuRedux = useAppSelector((state) => state.routes.openColorMenu);
  const routeToUpdate = useAppSelector((state) => state.routes.routeToUpdate);
  const colorLoading = useAppSelector((state) => state.routes.colorLoading);

  const dispatch = useAppDispatch();
  const openColorMenuRedux = (open: boolean) => {
    dispatch(openColorMenuAction(open));
  };
  const setRouteToAdd = (route: Route) => {
    dispatch(setRouteToAddAction(route));
  };
  const removeRoute = (id: string) => {
    dispatch(removeRouteAction(id));
  };
  const setColorLoading = (loading: boolean) => {
    dispatch(setColorLoadingAction(loading));
  };

  const { map } = useMapContext();

  const [colorMenuOpen, setColorMenuOpen] = useState<boolean>(false);
  const openColorMenu = () => setColorMenuOpen(true);
  const closeColorMenu = () => setColorMenuOpen(false);

  useEffect(() => {
    if (colorMenuRedux) {
      openColorMenu();
    } else {
      closeColorMenu();
    }
  }, [colorMenuRedux]);

  const handleCloseMenu = () => {
    openColorMenuRedux(false);
  };

  const removeLayer = (id: string) => {
    const layers = map.getLayers();

    const routeLayer = layers.array_.find(
      (layer: any) => layer.values_.id === id
    );
    const markerLayer = layers.array_.find(
      (layer: any) => layer.values_.id === id + 'MARKER'
    );

    if (routeLayer) {
      map.removeLayer(routeLayer);
    }
    if (markerLayer) {
      map.removeLayer(markerLayer);
    }
  };

  const handleColorSelect = (color: string) => {
    const { id } = routeToUpdate;
    setColorLoading(true);
    removeLayer(id);
    removeRoute(id);
    const updatedRoute = {
      ...routeToUpdate,
      color: color,
    };
    setRouteToAdd(updatedRoute);
  };

  const colorOptions = [
    { name: 'YELLOW', id: '#DFFB25' },
    { name: 'BLUE', id: '#4169E1' },
    { name: 'ORANGE', id: '#FFA500' },
    { name: 'PURPLE', id: '#663399' },
    { name: 'GREEN', id: '#00FF7F' },
    { name: 'WHITE', id: '#F5F5F5' },
    { name: 'RED', id: '#B22222' },
  ];

  return (
    <Drawer isOpen={colorMenuOpen} placement="bottom" onClose={handleCloseMenu}>
      <DrawerOverlay />
      <DrawerContent bg="brand.800">
        <DrawerCloseButton color="tan.200" />
        <DrawerHeader color="tan.200" textAlign="center">
          Select a color for{' '}
          <Text as="em" display="inline">
            {routeToUpdate.routeName}
          </Text>
        </DrawerHeader>
        <DrawerBody color="tan.200">
          <Flex width="100%" justify="center">
            {colorOptions.map((color) => (
              <Button
                key={color.name}
                ml="2"
                bg={color.id}
                borderColor="brand.800"
                color="brand.800"
                fontSize="1em"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80px"
                height="40px"
                disabled={colorLoading}
                isLoading={colorLoading}
                onClick={() => handleColorSelect(color.id)}
                _hover={{
                  border: '4px',
                  borderColor: 'white',
                }}
                _active={{
                  border: '4px',
                  borderColor: 'gold',
                }}
              >
                {color.name}
              </Button>
            ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RouteColorMenu;
