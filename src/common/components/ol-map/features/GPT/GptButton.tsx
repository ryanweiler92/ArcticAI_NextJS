'use client';
import Image from 'next/image';
import { Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  openGptModal: () => void;
}

const GptButton = ({ openGptModal }: Props) => {

  return (
    <Flex justify="center">
      <Button bg="tan.200" onClick={openGptModal}>
        <Flex justify="between" alignItems="center">
            <Image
              src={'/gpt_icon.svg'}
              height={'16'}
              width={'16'}
              alt={'GPT'}
            />
          <Text ml="2">GPT</Text>
        </Flex>
      </Button>
    </Flex>
  );
}

export default GptButton;