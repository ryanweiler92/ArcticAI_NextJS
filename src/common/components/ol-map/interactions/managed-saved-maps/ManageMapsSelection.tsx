'use client';

import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Divider,
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  setAvailableLayersAction,
  setLoadLayersAction,
  setSavedMapsAction,
  setSelectedMapAction,
} from '@redux/slices/mapSlice';
import {
  clearMarkersAction,
  setMarkersAction,
  setLoadMarkersAction,
} from '@redux/slices/markersSlice';
import { SavedMap, Marker, Layer } from '@redux/types';
import { useMapContext } from '@context/MapContext';
import { deleteMap } from '@handlers/mapHandlers';
import { getUserMaps, updateSavedMap } from '@handlers/mapHandlers';

interface Props {
  closeModal: () => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}
interface FormData {
  name: string;
  description: string;
}

const ManageMapsSelection = ({ closeModal, setLoading, loading }: Props) => {
  const maps = useAppSelector((state) => state.map.savedMaps);
  const availableLayers = useAppSelector((state) => state.map.availableLayers);
  const viewProperties = useAppSelector((state) => state.map.viewProperties);
  const markers = useAppSelector((state) => state.markers.markers);
  const routes = useAppSelector((state) => state.routes.routes);
  let order = 1;
  const layers = useAppSelector((state) =>
    state.map.availableLayers
      .filter((layer) => layer.isActive)
      .map((layer) => ({
        order: order++,
        title: layer.title,
        visibility: layer.isVisible,
      }))
  );

  const dispatch = useAppDispatch();
  const clearMarkers = () => dispatch(clearMarkersAction());
  const setLoadMarkers = (value: boolean) =>
    dispatch(setLoadMarkersAction(value));
  const setMarkers = (marker: Marker) => dispatch(setMarkersAction(marker));
  const setAvailableLayers = (availableLayers: Array<Layer>) => {
    dispatch(setAvailableLayersAction(availableLayers));
  };
  const setLoadLayers = (value: boolean) => {
    dispatch(setLoadLayersAction(value));
  };
  const setSelectedMapRedux = (map: SavedMap) => {
    dispatch(setSelectedMapAction(map));
  };

  const { map } = useMapContext();

  const [editScreen, setEditScreen] = useState<boolean>(false);
  const [deleteScreen, setDeleteScreen] = useState<boolean>(false);
  const [loadScreen, setLoadScreen] = useState<boolean>(false);
  const [selectedMap, setSelectedMap] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 2,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mapOne, setMapOne] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 2,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });
  const [mapTwo, setMapTwo] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 2,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });
  const [mapThree, setMapThree] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 2,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const removeLayersAndMarkers = async () => {
    const olLayers = map.getLayers().getArray().slice();
    olLayers.forEach((layer: any) => {
      if (layer.values_.id !== 'marker-layer') {
        map.removeLayer(layer);
      }
    });

    clearMarkers();

    const overlays = map.getOverlays().getArray().slice();
    overlays.forEach((overlay: any) => {
      map.removeOverlay(overlay);
    });
  };

  const loadMap = async (savedMap: SavedMap) => {
    setLoading(true);
    setSelectedMapRedux(savedMap);
    await removeLayersAndMarkers();

    map.getView().setCenter([selectedMap.latitude, selectedMap.longitude]);
    // need to be zoomed out when we place the markers
    map.getView().setZoom(1);

    // we loop through the selected saved map to add each marker to the store
    selectedMap.markers.forEach((marker: Marker) => {
      setMarkers(marker);
    });

    // loop through availableLayers config and find layers matching the current layers of the saved map
    const availableLayersUpdated = availableLayers
      .map((layer: any, index) => {
        const matchIndex = selectedMap.layers.findIndex(
          (selectedLayer) => selectedLayer.title === layer.title
        );
        if (matchIndex !== -1) {
          return {
            ...layer,
            isActive: true,
            isVisible: true,
            matchIndex,
          };
        } else {
          return {
            ...layer,
            isActive: false,
          };
        }
      })
      .sort((a, b) => {
        if (a.isActive && !b.isActive) {
          return -1;
        }
        if (!a.isActive && b.isActive) {
          return 1;
        }
        if (a.isActive && b.isActive) {
          return a.matchIndex - b.matchIndex;
        }
        return 0;
      })
      .map((layer) => {
        const { matchIndex, ...rest } = layer;
        return rest;
      });

    // setting state of layers config ex: isActive, isVisible in redux
    setAvailableLayers(availableLayersUpdated);

    // trigger hook in Markers.ts to add markers to openlayers
    setLoadMarkers(true);
    setLoadLayers(true);

    setTimeout(() => {
      setLoading(false);
      closeModal();
      map.getView().setZoom(selectedMap.zoom);
    }, 3000);
  };

  // handling form to edit map's name/description
  function onSubmit(values: FormData) {
    setLoading(true);
    const id = selectedMap.id;
    const { name, description } = values;
    const { zoom, centerCoords } = viewProperties;
    const updatedValues = {
      name,
      description,
      id,
      markers,
      layers,
      zoom,
      latitude: centerCoords[0],
      longitude: centerCoords[1],
      routes,
    };
    updateSavedMap(updatedValues);

    setTimeout(() => {
      fetchData();
      setLoading(false);
      closeModal();
    }, 3000);
  }

  const setSavedMaps = (savedMaps: SavedMap) => {
    dispatch(setSavedMapsAction(savedMaps));
  };

  const fetchData = async () => {
    const maps = await getUserMaps();
    setSavedMaps(maps);
  };

  const deleteSelectedMap = () => {
    setLoading(true);
    const { id } = selectedMap;
    deleteMap(id);

    setTimeout(() => {
      fetchData();
      setLoading(false);
      closeModal();
    }, 3000);
  };

  // to keep track of which map/slot/action was selected from the 3 saved maps
  const handleMapSelection = (
    choiceType: string,
    map: SavedMap,
    index: number
  ) => {
    setSelectedIndex(index);
    setSelectedMap(map);

    if (choiceType === 'edit') {
      setEditScreen(true);
    } else if (choiceType === 'delete') {
      setDeleteScreen(true);
    } else if (choiceType === 'load') {
      setLoadScreen(true);
    }
  };

  const overwriteSelection = (map: SavedMap, index: number) => {
    const mapName = map ? map.name : `Map ${index + 1}`;
    const mapDescription = map ? map.description : ' ';
    return (
      <Box>
        <Flex justifyContent="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/** @ts-ignore */}
            <FormControl isInvalid={errors.name}>
              <FormLabel
                htmlFor="name"
                color="tan.200"
                textAlign="center"
                fontWeight="600"
              >
                Map Name
              </FormLabel>
              <Input
                id="name"
                placeholder={mapName}
                color="tan.200"
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
                defaultValue={mapName}
              />
              <FormLabel
                htmlFor="description"
                color="tan.200"
                textAlign="center"
                mt="2"
                fontWeight="600"
              >
                Description
              </FormLabel>
              <Textarea
                id="description"
                placeholder="description"
                bg="brand.800"
                color="tan.200"
                {...register('description')}
                defaultValue={mapDescription}
              ></Textarea>
              <FormErrorMessage>
                {/** @ts-ignore */}
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="center">
              <Button
                mt={4}
                bg="tan.200"
                color="brand.800"
                isLoading={loading}
                type="submit"
              >
                Save
              </Button>
            </Flex>
          </form>
        </Flex>
      </Box>
    );
  };

  const noSavedMap = (index: number) => {
    return (
      <Box>
        <Flex
          border="1px"
          borderStyle="solid"
          borderColor="tan.200"
          height="300px"
          flexDirection="column"
          p="2"
        >
          <Text color="tan.200" textAlign="center" fontWeight="800">
            Save Slot {index + 1}
          </Text>
          <Divider width="90%" mx="auto" mb="2" />
          <Text color="tan.200" textAlign="center">
            No Saved Map
          </Text>
        </Flex>
      </Box>
    );
  };

  const savedMap = (map: SavedMap, index: number) => {
    const createdDate = map.createdAt.slice(0, 10);
    const updatedDate = map.updatedAt.slice(0, 10);
    return (
      <Box>
        <Flex
          border="1px"
          borderStyle="solid"
          borderColor="tan.200"
          height="300px"
          flexDirection="column"
          p="1"
        >
          <Text color="tan.200" textAlign="center" fontWeight="800">
            Save Slot {index + 1}
          </Text>
          <Divider width="90%" mx="auto" mb="2" />
          <Text color="tan.200">Name: {map.name}</Text>
          <Text color="tan.200">Description: {map.description}</Text>
          <Text color="tan.200">Created: {createdDate}</Text>
          <Text color="tan.200">Created: {updatedDate}</Text>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Button
            bg="tan.200"
            color="brand.800"
            mt="2"
            width="80%"
            onClick={() => handleMapSelection('load', map, index)}
            isLoading={loading}
          >
            Load Map
          </Button>
          <Button
            bg="tan.200"
            color="brand.800"
            mt="2"
            width="80%"
            onClick={() => handleMapSelection('edit', map, index)}
            isLoading={loading}
          >
            Edit Map Details
          </Button>
          <Button
            bg="red.800"
            color="black"
            mt="2"
            width="80%"
            onClick={() => handleMapSelection('delete', map, index)}
            isLoading={loading}
          >
            Delete Map
          </Button>
        </Flex>
      </Box>
    );
  };

  const confirmDeleteScreen = (map: SavedMap) => {
    return (
      <Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text color="tan.200" fontSize="xl">
            Are you sure you want to delete{' '}
            <Text as="span" fontWeight="bold">
              {map.name}
            </Text>
            ?
          </Text>
          <Flex justifyContent="center" mt="2">
            <Button
              bg="tan.200"
              color="brand.800"
              mr="1"
              onClick={closeModal}
              isLoading={loading}
            >
              Cancel
            </Button>
            <Button
              bg="red.800"
              color="black"
              onClick={deleteSelectedMap}
              isLoading={loading}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Box>
    );
  };

  const confirmLoadScreen = (map: SavedMap) => {
    return (
      <Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text color="tan.200" fontSize="xl">
            Are you sure you want to load{' '}
            <Text as="span" fontWeight="bold">
              {map.name}
            </Text>
            ? All unsaved progress on the current map will be lost.
          </Text>
          <Flex justifyContent="center" mt="2">
            <Button
              bg="tan.200"
              color="brand.800"
              mr="1"
              onClick={closeModal}
              isLoading={loading}
            >
              Cancel
            </Button>
            <Button
              bg="green.800"
              color="white"
              onClick={() => loadMap(map)}
              isLoading={loading}
            >
              Load
            </Button>
          </Flex>
        </Flex>
      </Box>
    );
  };

  // anytime the savedMaps are updated we update the local state of saved maps
  useEffect(() => {
    if (!maps) return;

    maps.forEach((map: SavedMap) => {
      if (map.saveSlot == 0) {
        setMapOne(map);
      } else if (map.saveSlot == 1) {
        setMapTwo(map);
      } else if (map.saveSlot == 2) {
        setMapThree(map);
      }
    });
  }, [maps]);

  return (
    <>
      {editScreen ? (
        overwriteSelection(selectedMap, selectedIndex)
      ) : deleteScreen ? (
        confirmDeleteScreen(selectedMap)
      ) : loadScreen ? (
        confirmLoadScreen(selectedMap)
      ) : (
        <Flex width="100%" justifyContent="space-between">
          {mapOne.id !== 0 ? savedMap(mapOne, 0) : noSavedMap(0)}
          {mapTwo.id !== 0 ? savedMap(mapTwo, 1) : noSavedMap(1)}
          {mapThree.id !== 0 ? savedMap(mapThree, 2) : noSavedMap(2)}
        </Flex>
      )}
    </>
  );
};

export default ManageMapsSelection;
