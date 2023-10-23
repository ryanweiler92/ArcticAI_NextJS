'use client';

import { Box, Flex, Text, Spinner } from '@chakra-ui/react';

const GptLoadingScreen = () => {
    
    return (
      <Box width="80%">
        <Text fontSize="xl" color="tan.200" fontWeight="bold" textAlign="center" mb="4">
          Gathering Location Data...
        </Text>
        <Text fontSize="lg" color="tan.200" textAlign="center" mb="8">
          This may take a few moments.
        </Text>
        <Flex justify="center">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='tan.200'
            color='brand.800'
            size='xl'
          />
        </Flex>
      </Box>
    );
  } 

export default GptLoadingScreen;