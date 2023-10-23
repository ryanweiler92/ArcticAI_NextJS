'use client';

import { Badge, Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from '@redux/hooks';

const Projection = () => {
  const projection = useAppSelector((state) => state.map.projection);

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
        Projection:
      </Text>
      <Badge
        variant="solid"
        bg="tan.200"
        color="black"
        fontSize="xl"
        px="2"
        ml="2"
      >
        {projection}
      </Badge>
    </Flex>
  );
};

export default Projection;
