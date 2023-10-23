'use client';

import { Flex, Text, Heading, Button } from '@chakra-ui/react';
import logo from '../../../../public/logo.png';
import ChakraImage from '../universal/Image';

const Hero = () => {
  return (
    <Flex
      justify="center"
      mt={{ base: 8, sm: 8, md: 16 }}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Flex
        direction="column"
        justify="center"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Heading
          as="h1"
          size={{ base: '2xl', sm: 'xl', md: '4xl' }}
          noOfLines={1}
          color="tan.200"
        >
          Welcome to ArcticAI
        </Heading>
        <Flex justify="center" my={4}>
          <ChakraImage
            src={logo}
            width={{ base: 100, sm: 100, md: 200 }}
            height={{ base: 100, sm: 100, md: 200 }}
            alt={'Arctic AI Logo'}
          />
        </Flex>
        <Flex justify="center" direction="column" my={2}>
          <Text
            fontSize={{ base: '2xl', sm: '2xl', md: '4xl' }}
            color="tan.200"
            align="center"
          >
            Build, Edit & Save Custom Maps
          </Text>
          <Button
            as={'a'}
            fontSize={'xl'}
            fontWeight={600}
            variant={'link'}
            color={'black'}
            bg={'tan.200'}
            href={'/mapping'}
            my={2}
            _hover={{
              bg: 'whiteAlpha.900',
            }}
            p={'1'}
          >
            Try for free!
          </Button>
        </Flex>
      </Flex>
      <Flex justify="center" my={2}></Flex>
    </Flex>
  );
};

export default Hero;
