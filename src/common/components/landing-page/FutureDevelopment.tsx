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
import ChakraImage from '../universal/Image';
import aiIcon from '../../../../public/ai-icon.png';
import phoneIcon from '../../../../public/phone-icon.png';
import embedIcon from '../../../../public/embed-icon.png';

const developmentArray = [
  {
    title: 'Integration of AI Technology',
    text: 'The ultimate goal of ArcticAI is to be able to plot markers through text prompts. We hope to achieve this in the near future via AI technology.',
    icon: aiIcon,
  },
  {
    title: 'Mobile Mapping',
    text: 'The ability to create and edit maps through mobile devices including smart phones is currently in development.',
    icon: phoneIcon,
  },
  {
    title: 'Embedding Maps',
    text: 'We want users to be able to display maps they have created on their own websites through embeded links in the future.',
    icon: embedIcon,
  },
];

const FutureDevelopment = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });
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
            Future Development
          </Heading>
        </Flex>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6} mt={4}>
          {developmentArray.map((feature, index) => (
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

export default FutureDevelopment;
