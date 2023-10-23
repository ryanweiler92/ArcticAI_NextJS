'use client';

import {
  Grid,
  GridItem,
  Box,
  Flex,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';
import ChakraImage from '../universal/Image';
import bingLogo from '../../../../public/bing-logo.png';
import maptilerLogo from '../../../../public/maptiler-logo.png';
import LayerCarousel from './LayerCarousel';
import aerialBingLabels from '../../../../public/aerial-bing.png';
import aerialBing from '../../../../public/aerial-bing-labels.png';
import canvasDark from '../../../../public/canvas-dark-bing.png';
import roadsOnDemand from '../../../../public/roads-on-demand-bing.png';
import streets from '../../../../public/streets.png';
import topographic from '../../../../public/topographic.png';
import satelliteHybrid from '../../../../public/satellite-hybrid.png';
import oceans from '../../../../public/oceans.png';

const bingCards = [
  {
    title: 'Aerial with Labels',
    image: aerialBingLabels,
  },
  {
    title: 'Canvas Dark',
    image: canvasDark,
  },
  {
    title: 'Roads on Demand',
    image: roadsOnDemand,
  },
  {
    title: 'Aerial',
    image: aerialBing,
  },
];

const maptilerCards = [
  {
    title: 'Streets',
    image: streets,
  },
  {
    title: 'Topographic',
    image: topographic,
  },
  {
    title: 'Satellite Hybrid',
    image: satelliteHybrid,
  },
  {
    title: 'Oceans',
    image: oceans,
  },
];

const LayerFeatures = () => {
  const columns = useBreakpointValue({ base: 1, md: 1 });

  return (
    <Flex justify="center" mt={8} boxShadow="lg" borderRadius="lg">
      <Flex
        direction="column"
        justify="center"
        width={{ base: '100%', sm: '100%', lg: '60%' }}
      >
        <Flex
          justify="center"
          borderBottom={'2px'}
          borderColor="tan.200"
          pb="2"
        >
          <Heading
            as="h3"
            size={{ base: 'lg', sm: 'lg', md: 'xl', xl: '2xl' }}
            noOfLines={1}
            color="tan.200"
          >
            Layers with Bing & MapTiler
          </Heading>
        </Flex>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6} mt={4}>
          <GridItem textAlign="center">
            <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
              <Flex
                justify="center"
                backgroundColor="tan.200"
                minH={{ base: 'auto', md: '60px' }}
              >
                <ChakraImage
                  src={bingLogo}
                  alt={'bing logo'}
                  width={{ base: 100, sm: 100, md: 210 }}
                />
              </Flex>
              <Flex
                justify="center"
                width={{ base: 'auto', sm: 'auto', md: 'auto' }}
              >
                <LayerCarousel cards={bingCards} />
              </Flex>
            </Box>
          </GridItem>
          <GridItem textAlign="center">
            <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
              <Flex
                justify="center"
                backgroundColor="tan.200"
                minH={{ base: 'auto', md: '60px' }}
              >
                <ChakraImage
                  src={maptilerLogo}
                  alt={'maptiler logo'}
                  width={{ base: 100, sm: 100, md: 210 }}
                />
              </Flex>
              <Flex justify="center">
                <LayerCarousel cards={maptilerCards} />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default LayerFeatures;
