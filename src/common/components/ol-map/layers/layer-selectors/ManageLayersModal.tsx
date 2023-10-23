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
import ActiveLayersDisplay from '@components/ol-map/layers/layer-selectors/ActiveLayers';

interface Props {
  manageLayersModalOpen: boolean;
  closeManageLayersModal: () => void;
}

const ManageLayersModal = ({
  manageLayersModalOpen,
  closeManageLayersModal,
}: Props) => {
  return (
    <Modal isOpen={manageLayersModalOpen} onClose={closeManageLayersModal}>
      <ModalOverlay />
      <ModalContent bg="brand.800">
        <ModalHeader color="tan.200" textAlign="center">
          <Text fontSize="2xl">Active Layers</Text>
          <Divider bg="tan.200" />
        </ModalHeader>
        <ModalCloseButton color="tan.200" />
        <ModalBody>
          <Flex width="100%" justify="center">
            <ActiveLayersDisplay />
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ManageLayersModal;
