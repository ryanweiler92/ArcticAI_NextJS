'use client';
import { useState, useEffect } from 'react';
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
import GptForm from './GptForm';
import GptLoadingScreen from './GptLoadingScreen';
import GptEditResults from './GptEditResults';
import { gptRequest } from '@handlers/apiHandlers'

interface Props {
  gptModalOpen: boolean;
  closeGptModal: () => void;
}

const GptModal = ({ gptModalOpen, closeGptModal }: Props) => {

  const [prompt, setPrompt] = useState('');
  // stages: 1. form 2. loading 3. edit-results 
  const [stage, setStage] = useState('edit-results');
  const [results, setResults] = useState([] as any);

  const handleGptRequest = async () => {
    const response = await gptRequest(prompt);
    setResults(response);
    setStage('edit-results');
    console.log(response);
  }

  useEffect(() => {
    if (stage === 'loading' && prompt) {
      handleGptRequest();
    }
  }, [stage]);

  return (
    <Modal isOpen={gptModalOpen} onClose={closeGptModal} size="xl">
      <ModalOverlay />
      <ModalContent bg="brand.800">
        <ModalHeader color="tan.200" textAlign="center">
          <Text fontSize="2xl">GPT Location Request</Text>
          <Divider bg="tan.200" />
        </ModalHeader>
        <ModalCloseButton color="tan.200" />
        <ModalBody>
          <Flex width="100%" justify="center">
            {stage === 'form' && <GptForm setPrompt={setPrompt} setStage={setStage} />}
            {stage === 'loading' && <GptLoadingScreen />}
            {stage === 'edit-results' && <GptEditResults closeGptModal={closeGptModal}/>}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
    );

}

export default GptModal;