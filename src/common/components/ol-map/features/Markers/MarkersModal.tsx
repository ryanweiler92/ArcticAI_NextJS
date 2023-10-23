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
import ActiveMarkersSideDisplay from '@components/ol-map/features/Markers/MarkersSideDisplay';

interface Props {
  markersModalOpen: boolean;
  closeMarkersModal: () => void;
}

const ActiveMarkersModal = ({ markersModalOpen, closeMarkersModal }: Props) => {
  return (
    <Modal isOpen={markersModalOpen} onClose={closeMarkersModal}>
      <ModalOverlay />
      <ModalContent bg="brand.800">
        <ModalHeader color="tan.200" textAlign="center">
          <Text fontSize="2xl"> Active Markers</Text>
          <Divider bg="tan.200" />
        </ModalHeader>
        <ModalCloseButton color="tan.200" />
        <ModalBody>
          <Flex width="100%" justify="center">
            <ActiveMarkersSideDisplay />
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActiveMarkersModal;
