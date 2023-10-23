'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import { SiManageiq } from 'react-icons/si';
import { useIsMobile } from '@hooks/hooks';

interface LoadEditMapsButtonProps {
  openModal: () => void;
}

const LoadEditMapsButton = ({ openModal }: LoadEditMapsButtonProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <Flex justify="center">
          <Button bg="tan.200" onClick={openModal}>
            <Flex justify="between" alignItems="center">
              <SiManageiq />
              <Text ml="2">Load/Mangage Maps</Text>
            </Flex>
          </Button>
        </Flex>
      )}
    </>
  );
};

export default LoadEditMapsButton;
