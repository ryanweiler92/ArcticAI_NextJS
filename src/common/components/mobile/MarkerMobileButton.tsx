'use client';

import {
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import { useMapContext } from '@context/MapContext';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { clearMarkersAction } from '@redux/slices/markersSlice';
import { setRoutesToRemoveAction } from '@redux/slices/routesSlice';

interface MarkerProps {
  triggerMarker: () => void;
  openMarkersModal: () => void;
}

const MarkerMobileButton = ({
  triggerMarker,
  openMarkersModal,
}: MarkerProps) => {
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
    <Menu>
      <MenuButton as={Button} bg="tan.200">
        <FaMapMarkerAlt />
      </MenuButton>
      <MenuList bg="brand.800">
        <MenuItem bg="brand.800" onClick={triggerMarker}>
          <Flex width="100%" justify="between" alignItems="center">
            <Text color="tan.200">Add Marker</Text>
            <Spacer />
            <FaMapMarkerAlt color="tan" />
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="brand.800">
          <Flex
            width="100%"
            justify="between"
            alignItems="center"
            onClick={clearMarkers}
          >
            <Text color="tan.200">Clear Markers</Text>
            <Spacer />
            <MdRemoveCircle color="tan" />
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="brand.800">
          <Flex
            width="100%"
            justify="between"
            alignItems="center"
            onClick={openMarkersModal}
          >
            <Text color="tan.200">Manage Active Markers</Text>
            <Spacer />
            <MdRemoveCircle color="tan" />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MarkerMobileButton;
