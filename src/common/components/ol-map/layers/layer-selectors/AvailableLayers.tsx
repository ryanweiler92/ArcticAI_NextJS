'use client';

import { Box, Button, Flex, Text, Badge, Divider } from '@chakra-ui/react';
import { SiOpenstreetmap, SiMicrosoftbing } from 'react-icons/si';
import { MdAddToPhotos } from 'react-icons/md';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  setLayerToAddAction,
  setAvailableLayersAction,
} from '@redux/slices/mapSlice';
import { LayerToAdd, Layer } from '@redux/types';

const AvailableLayers = () => {
  const availableLayers = useAppSelector((state) => state.map.availableLayers);

  const dispatch = useAppDispatch();
  const setLayerToAdd = (layerToAdd: LayerToAdd) => {
    dispatch(setLayerToAddAction(layerToAdd));
  };
  const setAvailableLayers = (availableLayers: any) => {
    dispatch(setAvailableLayersAction(availableLayers));
  };

  const handleAddLayer = (layer: Layer) => {
    const { source, imagerySet, title, styleUrl, type } = layer;
    setLayerToAdd({
      title,
      source,
      imagerySet,
      type,
      styleUrl,
    });

    let availableLayersCopy = availableLayers;
    let updatedLayers: Array<Layer> = [];
    let updatedLayer;

    availableLayersCopy.forEach((availLayer) => {
      updatedLayer = { ...availLayer };
      if (availLayer.title === layer.title) {
        updatedLayer.isVisible = true;
        updatedLayer.isActive = true;
        updatedLayers.unshift(updatedLayer);
      } else {
        updatedLayers.push(availLayer);
      }
    });

    setAvailableLayers(updatedLayers);
  };

  return (
    <Box width="80%">
      <Box>
        <Flex justifyContent={'center'}>
          <Badge fontSize={'xl'} colorScheme={'tan'}>
            Raster Layers
          </Badge>
        </Flex>
        {availableLayers?.map((layer: Layer) => {
          if (!layer.isActive && layer.type === 'raster')
            return (
              <Flex
                width="100%"
                justify="space-between"
                alignItems="center"
                my="2"
                key={layer.title}
              >
                {layer.source === 'BingMaps' ? (
                  <SiMicrosoftbing color="tan" fontSize="1.5rem" />
                ) : (
                  <SiOpenstreetmap color="tan" fontSize="1.5rem" />
                )}
                <Text color="tan.200" fontSize="lg" fontWeight="600">
                  {layer.title}
                </Text>
                <Button
                  bg="tan.200"
                  size="md"
                  onClick={() => handleAddLayer(layer)}
                >
                  <MdAddToPhotos color="#1e293b" />
                </Button>
              </Flex>
            );
        })}
        <Divider mt={'4'} />
        <Flex justifyContent={'center'}>
          <Badge fontSize={'xl'} colorScheme={'tan'} mt={'4'}>
            Vector Layers
          </Badge>
        </Flex>
        {availableLayers?.map((layer: Layer) => {
          if (!layer.isActive && layer.type === 'vector')
            return (
              <Flex
                width="100%"
                justify="space-between"
                alignItems="center"
                my="2"
                key={layer.title}
              >
                {layer.source === 'BingMaps' ? (
                  <SiMicrosoftbing color="tan" fontSize="1.5rem" />
                ) : (
                  <SiOpenstreetmap color="tan" fontSize="1.5rem" />
                )}
                <Text color="tan.200" fontSize="lg" fontWeight="600">
                  {layer.title}
                </Text>
                <Button
                  bg="tan.200"
                  size="md"
                  onClick={() => handleAddLayer(layer)}
                >
                  <MdAddToPhotos color="#1e293b" />
                </Button>
              </Flex>
            );
        })}
      </Box>
    </Box>
  );
};

export default AvailableLayers;
