'use client';

import { Flex } from '@chakra-ui/react';
import screenshot from '../../../../public/screenshot-png.png';
import ChakraImage from '../universal/Image';

const Features = () => {
  return (
    <Flex
      id="screenshot-container"
      justify="center"
      my="4"
      boxShadow="lg"
      borderRadius="lg"
    >
      <Flex id="screenshot-image-container" py="2">
        <ChakraImage
          src={screenshot}
          width={{ base: 400, sm: 400, md: 800 }}
          height={{ base: 190, sm: 190, md: 381 }}
          alt={'Arctic AI Screenshot'}
        />
      </Flex>
    </Flex>
  );
};

export default Features;
