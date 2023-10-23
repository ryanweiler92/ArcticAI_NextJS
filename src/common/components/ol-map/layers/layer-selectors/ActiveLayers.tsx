'use client';

// active layers sidebar component that controls order
import { Box, Flex, Text, Divider, IconButton } from '@chakra-ui/react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import LayerGroup from 'ol/layer/Group';
import { useMapContext } from '@context/MapContext';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setAvailableLayersAction } from '@redux/slices/mapSlice';
import { Layer } from '@redux/types';
import { useIsMobile } from '@hooks/hooks';

const ActiveLayers = () => {
  const availableLayers = useAppSelector((state) => state.map.availableLayers);
  const dispatch = useAppDispatch();
  const setAvailableLayers = (availableLayers: Array<Layer>) => {
    dispatch(setAvailableLayersAction(availableLayers));
  };

  const isMobile = useIsMobile();

  const { map } = useMapContext();

  const activeLayers = availableLayers?.filter((layer) => layer.isActive);

  const toggleVisibility = (title: string) => {
    const availableLayersUpdated = availableLayers.map((layer: Layer) => {
      if (layer.title === title) {
        const layerVisibility = layer.isVisible;
        return {
          ...layer,
          isVisible: !layerVisibility,
        };
      } else {
        return layer;
      }
    });
    setAvailableLayers(availableLayersUpdated);

    let foundLayer;
    const topLayers = map.getLayers().getArray();
    for (const topLayer of topLayers) {
      if (topLayer instanceof LayerGroup) {
        const innerLayers = topLayer.getLayers().getArray();
        foundLayer = innerLayers.find((layer: any) => layer.get('id') === title);
        if (foundLayer) break;
      } else if (topLayer.get('id') === title) {
        foundLayer = topLayer;
        break;
      }
    }

    if (foundLayer) {
      const isVisible = foundLayer.getVisible();
      foundLayer.setVisible(!isVisible);
    }
  };

  const removeLayer = (title: string) => {
    const layerGroups = map.getLayers().getArray();

    let layerToRemove;

    // Iterating over each layer group to find the layer
    for (let group of layerGroups) {
      if (group instanceof LayerGroup) {
        const layer = group.getLayers().getArray().find(
          (layer: any) => layer.get('id') === title
        );
        if (layer) {
          layerToRemove = layer;
          group.getLayers().remove(layer);
          break; // Exit the loop once the layer is found and removed
        }
      }
    }

    const availableLayersUpdated = availableLayers.map((layer: Layer) => {
      if (layer.title === title) {
        return {
          ...layer,
          isVisible: false,
          isActive: false,
        };
      } else {
        return layer;
      }
    });
    setAvailableLayers(availableLayersUpdated);
  };

const reorderLayers = (index: number, layerParam: any, direction: string) => {
    const newArray = availableLayers.filter(
      (layer) => layer.title !== layerParam.title
    );
    if (direction == 'up') {
      newArray.splice(index - 1, 0, layerParam);
    } else {
      newArray.splice(index + 1, 0, layerParam);
    }

    setAvailableLayers(newArray);

    // Search for the target layer inside the group
    const findLayerInGroup = (group: any) => {
      let foundLayer;
      group.getLayers().forEach((layer: any) => {
        if (layer.values_.id === layerParam.title) {
          foundLayer = layer;
        }
      });
      return foundLayer;
    }

    // Identify which layer group contains the target layer
    let olLayers = map.getLayers().getArray();
    let targetGroup;
    for (let layer of olLayers) {
      if (layer instanceof LayerGroup) {
        const foundLayer = findLayerInGroup(layer);
        if (foundLayer) {
          targetGroup = layer;
          break;
        }
      }
    }

    // If found, reorder the layer within the layer group
    if (targetGroup) {
      let targetLayer = findLayerInGroup(targetGroup);

      if (!targetLayer) {
        console.error('Target layer not found in group.');
        return;
      }

      let layerIndex = targetGroup.getLayers().getArray().indexOf(targetLayer);
      if (layerIndex !== -1 && direction == 'down') {
        targetGroup.getLayers().removeAt(layerIndex);
        targetGroup.getLayers().insertAt(layerIndex - 1, targetLayer);
      } else if (layerIndex !== -1 && direction == 'up') {
        targetGroup.getLayers().removeAt(layerIndex);
        targetGroup.getLayers().insertAt(layerIndex + 1, targetLayer);
      }
    }

};

  return (
    <Box width="100%" mb="8">
      {!isMobile && (
        <>
          <Flex justify="center" width="100%">
            <Text color="tan.200" fontSize="xl" fontWeight="600">
              Active Layers
            </Text>
          </Flex>
          <Flex justify="center">
            <Divider width="80%" />
          </Flex>
        </>
      )}
      {activeLayers?.map((layer: Layer, index: number) => {
        if (layer.isActive)
          return (
            <Flex
              mt="2"
              flexDirection="column"
              alignItems="center"
              border="2px"
              borderColor="tan.200"
              borderRadius="10"
              key={layer.title}
            >
              <Flex justify="center" width="100%">
                <Text textAlign="center" color="tan.200" fontWeight="600">
                  {layer.title}
                </Text>
              </Flex>
              <Flex
                width={isMobile ? '50%' : { lg: '95%', xl: '85%' }}
                justify="space-between"
                alignItems="center"
                mb="1"
              >
                {index !== 0 ? (
                  <IconButton
                    bg="tan.200"
                    size="sm"
                    icon={<ArrowUpIcon />}
                    aria-label="move layer up"
                    onClick={() => reorderLayers(index, layer, 'up')}
                  />
                ) : (
                  <IconButton
                    aria-label="placeholder"
                    bg="transparent"
                    size="sm"
                    pointerEvents="none"
                  />
                )}
                {layer.isVisible ? (
                  <IconButton
                    bg="tan.200"
                    size="sm"
                    icon={<ViewIcon />}
                    aria-label="layer visible"
                    onClick={() => toggleVisibility(layer.title)}
                  />
                ) : (
                  <IconButton
                    bg="gray.200"
                    size="sm"
                    icon={<ViewOffIcon />}
                    aria-label="layer invisible"
                    onClick={() => toggleVisibility(layer.title)}
                  />
                )}
                <IconButton
                  bg="tan.200"
                  size="sm"
                  icon={<DeleteIcon />}
                  aria-label="remove layer"
                  onClick={() => removeLayer(layer.title)}
                />

                {index !== activeLayers.length - 1 ? (
                  <IconButton
                    bg="tan.200"
                    size="sm"
                    icon={<ArrowDownIcon />}
                    aria-label="move layer down"
                    onClick={() => reorderLayers(index, layer, 'down')}
                  />
                ) : (
                  <IconButton
                    aria-label="placeholder"
                    bg="transparent"
                    size="sm"
                    pointerEvents="none"
                  />
                )}
              </Flex>
            </Flex>
          );
      })}
    </Box>
  );
};

export default ActiveLayers;
