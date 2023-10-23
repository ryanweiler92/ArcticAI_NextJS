'use client';

import { Box, Flex, Text, List, ListItem, Divider, Button, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface Props {
  setPrompt: (value: string) => void;
  setStage: (value: string) => void;
}

const GptForm = ({ setPrompt, setStage }: Props) => {

  const { register, handleSubmit, watch } = useForm();
  const textValue = watch('prompt', '');

  const onSubmit = (data: any) => {
    console.log(data);
    setPrompt(data.prompt);
    setStage('loading');
  };

  return (
    <Box width="80%">
      <Flex direction="column" alignItems="center" id="gpt-instructions" mb="2">
        <Text fontSize="xl" color="tan.200" fontWeight="bold">
          Instructions
        </Text>
        <List spacing={1} color="tan.200" styleType="disc" paddingLeft="1.5rem">
          <ListItem>Enter a short prompt to request coordinates for a list of locations.</ListItem>
          <ListItem>The model will return a list of coordinates for each location.</ListItem>
          <ListItem>You will then be allowed to remove any results.</ListItem>
          <ListItem>NOTE: Not all requests will return results.</ListItem>
          <ListItem fontWeight="bold">EX: "Major colleges in Virginia."</ListItem>
        </List>
      </Flex>
      <Divider bg="tan.200" />
      <Flex direction="column" alignItems="center" mt="4" width="100%">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '75%' }}>
          <Textarea 
            {...register('prompt', { required: true, maxLength: 50 })}
            placeholder="Enter your prompt here..."
            borderColor="tan.200"
            width="100%"
            color="tan.200"
          />
          <Flex direction="column" alignItems="center" mt="2">
          <Text mt="1" color="tan.200">{textValue.length}/50</Text>
          <Button 
            mt="2" 
            type="submit" 
            isDisabled={!textValue.trim()}
            colorScheme={textValue.trim() ? "blue" : "gray"}  // Change the color scheme based on disabled state
            opacity={textValue.trim() ? 1 : 0.6}>Submit</Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  )
}

export default GptForm;