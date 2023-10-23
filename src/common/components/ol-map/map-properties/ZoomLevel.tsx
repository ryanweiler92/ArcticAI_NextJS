'use client';

import { Badge, Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../../Redux/hooks';

const ZoomLevel = () => {
  const viewProperties = useAppSelector((state) => state.map.viewProperties);
  const { zoom } = viewProperties;

  return (
    <Flex
      flexDirection="row"
      justify="center"
      alignItems="center"
      border="4px solid tan.200"
      width="100%"
      minHeight="5vh"
    >
      <Text color="tan.200" fontWeight="800" fontSize="xl">
        Zoom Level:
      </Text>
      <Badge
        variant="solid"
        bg="tan.200"
        color="black"
        fontSize="xl"
        px="4"
        ml="2"
      >
        {zoom}
      </Badge>
    </Flex>
  );
};

export default ZoomLevel;
