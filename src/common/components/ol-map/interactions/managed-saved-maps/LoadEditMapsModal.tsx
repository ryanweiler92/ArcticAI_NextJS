'use client';

import { useState } from 'react';
import {
  Flex,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import ManageMapsSelection from './ManageMapsSelection';

interface Props {
  modalState: boolean;
  closeModal: () => void;
}

const LoadEditMapsModal = ({ modalState, closeModal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal
      isOpen={modalState}
      onClose={closeModal}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent bg="brand.800">
        <ModalHeader color="tan.200" textAlign="center">
          <Text fontSize="2xl">Load Or Manage Your Saved Maps</Text>
          <Divider bg="tan.200" />
        </ModalHeader>
        {!loading ? <ModalCloseButton color="tan.200" /> : null}
        <ModalBody>
          <Flex width="100%" justify="center">
            <ManageMapsSelection
              closeModal={closeModal}
              setLoading={setLoading}
              loading={loading}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadEditMapsModal;
