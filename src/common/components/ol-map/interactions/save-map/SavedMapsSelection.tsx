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
import { SavedMap } from '@redux/types';
import { saveNewMap, getUserMaps, updateSavedMap } from '@handlers/mapHandlers';
import { setSavedMapsAction } from '@redux/slices/mapSlice';

interface SavedMapsProps {
  closeModal: () => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}
interface FormData {
  name: string;
  description: string;
}

const SavedMapsSelection = ({
  closeModal,
  setLoading,
  loading,
}: SavedMapsProps) => {
  const maps = useAppSelector((state) => state.map.savedMaps);
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

  const [finalStep, setFinalStep] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedMap, setSelectedMap] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 0,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });
  const [mapOne, setMapOne] = useState<SavedMap>({
    id: 0,
    name: '',
    description: '',
    markers: [],
    layers: [],
    routes: [],
    zoom: 0,
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
    zoom: 0,
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
    zoom: 0,
    latitude: 38.82045,
    longitude: -77.050552,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  });

  const setSavedMaps = (savedMaps: SavedMap) => {
    dispatch(setSavedMapsAction(savedMaps));
  };

  const fetchData = async () => {
    const maps = await getUserMaps();
    setSavedMaps(maps);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    setLoading(true);
    if (selectedMap.id === 0) {
      const { name, description } = values;
      const { zoom, centerCoords } = viewProperties;
      const updatedValues = {
        name,
        description,
        saveSlot: selectedIndex,
        zoom,
        latitude: centerCoords[0],
        longitude: centerCoords[1],
        markers,
        layers,
        routes,
      };
      saveNewMap(updatedValues);
    } else {
      const id = selectedMap?.id;
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
    }

    setTimeout(() => {
      fetchData();
      setLoading(false);
      closeModal();
    }, 3000);
  }

  const handleSaveSelection = (map: SavedMap | null, index: number) => {
    setSelectedIndex(index);
    if (map) setSelectedMap(map);
    setFinalStep(true);
  };

  useEffect(() => {
    if (!maps) return;

    maps.forEach((map) => {
      if (map.saveSlot == 0) {
        setMapOne(map);
      } else if (map.saveSlot == 1) {
        setMapTwo(map);
      } else if (map.saveSlot == 2) {
        setMapThree(map);
      }
    });
  }, [maps]);

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
        >
          <Text color="tan.200" textAlign="center" fontWeight="800">
            Save Slot {index + 1}
          </Text>
          <Divider width="90%" mx="auto" mb="2" />
          <Text color="tan.200" textAlign="center">
            No Saved Map
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Button
            bg="tan.200"
            color="brand.800"
            mt="2"
            onClick={() => handleSaveSelection(null, index)}
          >
            Save To Slot {index + 1}
          </Button>
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
        <Flex justifyContent="center">
          <Button
            bg="tan.200"
            color="brand.800"
            mt="2"
            onClick={() => handleSaveSelection(map, index)}
            isLoading={loading}
          >
            Overwrite Slot {index + 1}
          </Button>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      {finalStep ? (
        overwriteSelection(selectedMap, selectedIndex)
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

export default SavedMapsSelection;
