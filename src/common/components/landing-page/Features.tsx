'use client';

import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';
import saveIcon from '../../../../public/save-icon.png';
import layersIcon from '../../../../public/layers-icon.png';
import markerIcon from '../../../../public/marker-icon.png';
import routesIcon from '../../../../public/routes-icon.png';
import ChakraImage from '../universal/Image';

const featuresArray = [
  {
    title: 'Save, Edit and Load Maps',
    text: 'With the creation of an account, you can save up to 3 custom maps to persist markers, layers & routes.',
    icon: saveIcon,
  },
  {
    title: '10+ Vector & Raster Layers',
    text: 'Chose from an array of vector & raster layers provided through Bing & MapTiler.',
    icon: layersIcon,
  },
  {
    title: 'Custom Markers',
    text: 'Place custom markers by hand or through our search results. Rename and organize markers after placement.',
    icon: markerIcon,
  },
  {
    title: 'Create Animated Routes',
    text: 'Customize animated routes with different colors that connect your placed markers.',
    icon: routesIcon,
  },
];

const Features = () => {
  const columns = useBreakpointValue({ base: 1, md: 4 });
  return (
    <Flex justify="center" mt={8} boxShadow="lg" borderRadius="lg">
      <Flex
        direction="column"
        justify="center"
        width={{ base: '100%', sm: '100%', lg: '60%' }}
        boxShadow="lg"
        borderRadius="lg"
      >
        <Flex
          justify="center"
          borderBottom={'2px'}
          borderColor="tan.200"
          pb="2"
        >
          <Heading
            as="h3"
            size={{ base: '2xl', sm: 'xl', md: '2xl' }}
            noOfLines={1}
            color="tan.200"
          >
            Current Features
          </Heading>
        </Flex>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6} mt={4}>
          {featuresArray.map((feature, index) => (
            <GridItem key={index} textAlign="center">
              <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
                <Flex justify="center">
                  <ChakraImage
                    src={feature.icon}
                    alt={feature.title}
                    width={90}
                    height={90}
                  />
                </Flex>
                <Box p={4}>
                  <Heading as="h3" size="md" color="tan.200" mb={2}>
                    {feature.title}
                  </Heading>
                  <Text color="tan.200">{feature.text}</Text>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Features;
