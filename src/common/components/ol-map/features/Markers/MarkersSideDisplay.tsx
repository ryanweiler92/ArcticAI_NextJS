'use client';

import {
  Box,
  IconButton,
  Button,
  Flex,
  Text,
  Divider,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
  useEditableControls,
} from '@chakra-ui/react';
import { MdRemoveCircle } from 'react-icons/md';
import { FaPlane } from 'react-icons/fa';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useMapContext } from '@context/MapContext';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  removeMarkerAction as removeMarkerRedux,
  setFlyToCoordinatesAction,
  setMarkerToUpdateAction,
  updateMarkerNameAction,
} from '@redux/slices/markersSlice';
import { UpdatedMarkerName, Marker } from '@redux/types';
import { useIsMobile } from '@hooks/hooks';

const ActiveMarkersSideDisplay = () => {
  const markers = useAppSelector((state) => state.markers.markers);

  const dispatch = useAppDispatch();
  const removeMarkerAction = (id: string) => {
    dispatch(removeMarkerRedux(id));
  };
  const updateMarkerName = (updatedMarkerName: UpdatedMarkerName) => {
    dispatch(updateMarkerNameAction(updatedMarkerName));
  };
  const setFlyToCoordinates = (coordinates: Array<number>) => {
    dispatch(setFlyToCoordinatesAction(coordinates));
  };
  const setMarkerToUpdate = (marker: Marker) => {
    dispatch(setMarkerToUpdateAction(marker));
  };

  const isMobile = useIsMobile();

  const { map } = useMapContext();

  const removeMarker = (id: string) => {
    const overlays = map.getOverlays().getArray().slice();

    overlays.forEach((overlay: any) => {
      if (overlay.id == id) {
        map.removeOverlay(overlay);
      }
    });
    removeMarkerAction(id);
  };

  const updateMarkerNameOnSubmit = (
    clientId: string,
    location: string,
    longitude: number,
    latitude: number
  ) => {
    const updatedMarkerName = { clientId, location };
    const marker = { clientId, location, longitude, latitude };
    updateMarkerName(updatedMarkerName);

    const overlays = map.getOverlays().getArray().slice();

    overlays.forEach((overlay: any) => {
      if (overlay.id == clientId) {
        map.removeOverlay(overlay);
      }
    });

    setMarkerToUpdate(marker);
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <>
        <IconButton
          icon={<CheckIcon />}
          aria-label="submit marker name"
          bg="tan.200"
          size="sm"
          color="brand.800"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label="cancel"
          bg="tan.200"
          size="sm"
          color="brand.800"
          {...getCancelButtonProps()}
        />
      </>
    ) : (
      <IconButton
        icon={<EditIcon />}
        aria-label="edit marker name"
        bg="tan.200"
        size="sm"
        color="brand.800"
        {...getEditButtonProps()}
      />
    );
  };

  return (
    <Box width="100%" mt={isMobile ? '0' : '4'}>
      {!isMobile && (
        <>
          <Flex justify="center" width="100%">
            <Text color="tan.200" fontSize="xl" fontWeight="600">
              Active Markers
            </Text>
          </Flex>
          <Flex justify="center">
            <Divider width="80%" />
          </Flex>
        </>
      )}
      {markers && markers.length > 0 ? (
        markers.map((marker: any) => {
          return (
            <Flex
              mt="2"
              flexDirection="column"
              alignItems="center"
              border="2px"
              borderColor="tan.200"
              borderRadius="10"
              key={marker.clientId}
            >
              <Editable
                textAlign="center"
                color="tan.200"
                fontSize="sm"
                fontWeight="600"
                defaultValue={marker.location}
                isPreviewFocusable={false}
                onSubmit={(title) =>
                  updateMarkerNameOnSubmit(
                    marker.clientId,
                    title,
                    marker.longitude,
                    marker.latitude
                  )
                }
              >
                <Box width="100%" px=".5">
                  <EditablePreview />
                  <Input as={EditableInput} fontSize="xs" width="100%" />
                </Box>

                <Flex gap="4" mt="1" justifyContent={'center'} pb="1">
                  <Button
                    bg="tan.200"
                    size="sm"
                    color="brand.800"
                    onClick={() => removeMarker(marker.id)}
                  >
                    <MdRemoveCircle />
                  </Button>
                  <Button
                    bg="tan.200"
                    size="sm"
                    color="brand.800"
                    onClick={() => setFlyToCoordinates([marker.longitude, marker.latitude])}
                  >
                    <FaPlane />
                  </Button>
                  <EditableControls />
                </Flex>
              </Editable>
            </Flex>
          );
        })
      ) : (
        <Flex
          mt="2"
          flexDirection="column"
          alignItems="center"
          border="2px"
          borderColor="tan.200"
          borderRadius="10"
        >
          <Text color="tan.200" fontSize="md" fontWeight="600" my="4">
            No Active Markers
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ActiveMarkersSideDisplay;
