'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { FaLayerGroup } from 'react-icons/fa';

interface Props {
  layerModalOpen: boolean;
  setLayerModalOpen: (value: boolean) => void;
}

const LayerModalButton = ({ layerModalOpen, setLayerModalOpen }: Props) => {
  return (
    <Flex justify="center">
      <Button bg="tan.200" onClick={() => setLayerModalOpen(!layerModalOpen)}>
        <Flex justify="between" alignItems="center">
          <FaLayerGroup />
          <Text ml="2">Add Layer</Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default LayerModalButton;
