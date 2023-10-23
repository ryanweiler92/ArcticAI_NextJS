'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface MarkerProps {
  triggerMarker: () => void;
}

const MarkerButton = ({ triggerMarker }: MarkerProps) => {
  return (
    <Flex justify="center">
      <Button bg="tan.200" onClick={triggerMarker}>
        <Flex justify="between" alignItems="center">
          <FaMapMarkerAlt />
          <Text ml="2">Add Marker</Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default MarkerButton;
