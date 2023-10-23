'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { MdRemoveCircle } from 'react-icons/md';
import { useMapContext } from '@context/MapContext';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { clearMarkersAction } from '@redux/slices/markersSlice';
import { setRoutesToRemoveAction } from '@redux/slices/routesSlice';

const ClearMarkersButton = () => {
  const routes = useAppSelector((state) => state.routes.routes);
  const dispatch = useAppDispatch();
  const clearMarkers = () => {
    const overlays = map.getOverlays().getArray().slice();
    overlays.forEach((overlay: any) => {
      map.removeOverlay(overlay);
    });
    dispatch(clearMarkersAction());
    dispatch(setRoutesToRemoveAction(routes.map((route) => route.id)));
  };

  const { map } = useMapContext();

  return (
    <Flex justify="center">
      <Button bg="tan.200" onClick={clearMarkers}>
        <Flex justify="between" alignItems="center">
          <MdRemoveCircle />
          <Text ml="2">Clear Markers</Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default ClearMarkersButton;
