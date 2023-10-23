'use client';

import {
  Flex,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AvailableLayers from './AvailableLayers';
import { useAppSelector } from '@redux/hooks';

interface Props {
  layerModalOpen: boolean;
  setLayerModalOpen: (value: boolean) => void;
}

const AvailableLayerModal = ({ layerModalOpen, setLayerModalOpen }: Props) => {
  const projection = useAppSelector((state) => state.map.projection);

  const onClose = () => setLayerModalOpen(false);

  return (
    <Modal isOpen={layerModalOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="brand.800">
        <ModalHeader color="tan.200" textAlign="center">
          <Text fontSize="2xl">{projection} Available Layers</Text>
          <Divider bg="tan.200" />
        </ModalHeader>
        <ModalCloseButton color="tan.200" />
        <ModalBody>
          <Flex width="100%" justify="center">
            <AvailableLayers />
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvailableLayerModal;
