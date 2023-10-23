'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { FaRoute } from 'react-icons/fa';

interface Props {
  openRoutesMenu: () => void;
}

const RoutesButton = ({ openRoutesMenu }: Props) => {
  return (
    <Flex justify="center">
      <Button bg="tan.200" onClick={() => openRoutesMenu()}>
        <Flex justify="between" alignItems="center">
          <FaRoute />
          <Text ml="2">Create Route</Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default RoutesButton;
