import { useState } from 'react';
import { Box, Flex, Text, Button, CloseButton } from '@chakra-ui/react';
import { Marker } from '@redux/types';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setGptMarkersAction } from '@redux/slices/markersSlice';

interface ResultItemProps {
  result: Marker;
  onRemove: (result: Marker) => void;
}

interface GptEditResultsProps {
  closeGptModal: () => void;
}

const initialResults = [
    {
        "clientId": "444441",
        "longitude": -78.50798,
        "latitude": 38.0336,
        "location": "University of Virginia"
    },
    {
        "clientId": "15675",
        "longitude": -80.42352,
        "latitude": 37.22838,
        "location": "Virginia Tech"
    },
    {
        "clientId": "1373",
        "longitude": -77.30714,
        "latitude": 38.83076,
        "location": "George Mason University"
    },
    // {
    //     "clientId": "175757",
    //     "latitude": -78.87126,
    //     "longitude": 38.43816,
    //     "location": "James Madison University"
    // },
    // {
    //     "clientId": "156565",
    //     "latitude": -76.71351,
    //     "longitude": 37.27188,
    //     "location": "College of William & Mary"
    // },
    // {
    //     "clientId": "1474747",
    //     "latitude": -77.45188,
    //     "longitude": 37.54924,
    //     "location": "Virginia Commonwealth University"
    // },
    // {
    //     "clientId": "16547",
    //     "latitude": -76.30509,
    //     "longitude": 36.88682,
    //     "location": "Old Dominion University"
    // },
    // {
    //     "clientId": "14568754",
    //     "latitude": -79.17853,
    //     "longitude": 37.3458,
    //     "location": "Liberty University"
    // },
    // {
    //     "clientId": "100022",
    //     "latitude": -77.0489,
    //     "longitude": 38.89923,
    //     "location": "George Washington University"
    // },
    // {
    //     "clientId": "12228888",
    //     "latitude": -80.54802,
    //     "longitude": 37.12723,
    //     "location": "Radford University"
    // },
    // {
    //     "clientId": "13",
    //     "latitude": -76.4905,
    //     "longitude": 37.05975,
    //     "location": "Christopher Newport University"
    // },
    // {
    //     "clientId": "155",
    //     "latitude": -78.39909,
    //     "longitude": 37.29615,
    //     "location": "Longwood University"
    // },
    // {
    //     "clientId": "16666",
    //     "latitude": -76.27039,
    //     "longitude": 36.85643,
    //     "location": "Norfolk State University"
    // },
    // {
    //     "clientId": "1888",
    //     "latitude": -76.33423,
    //     "longitude": 37.0197,
    //     "location": "Hampton University"
    // },
    // {
    //     "clientId": "12222",
    //     "latitude": -79.44659,
    //     "longitude": 37.787,
    //     "location": "Virginia Military Institute"
    // },
    // {
    //     "clientId": "22221",
    //     "latitude": -77.42816,
    //     "longitude": 37.24422,
    //     "location": "Virginia State University"
    // },
    // {
    //     "clientId": "1333",
    //     "latitude": -77.12211,
    //     "longitude": 38.92431,
    //     "location": "Marymount University"
    // },
    // {
    //     "clientId": "1555",
    //     "latitude": -79.94217,
    //     "longitude": 37.33523,
    //     "location": "Hollins University"
    // },
    // {
    //     "clientId": "2341",
    //     "latitude": -77.47716,
    //     "longitude": 37.75774,
    //     "location": "Randolph-Macon College"
    // },
    // {
    //     "clientId": "13243234",
    //     "latitude": -80.05626,
    //     "longitude": 37.29209,
    //     "location": "Roanoke College"
    // }
]

const ResultItem = ({ result, onRemove }: ResultItemProps) => {
  return (
    <Box
      border="1px solid tan"
      borderRadius="md"
      padding="1rem"
      width="48%" 
      marginBottom="1rem"
      position="relative"
    >
      <CloseButton position="absolute" right="2px" top="1px" color="tan.200" onClick={() => onRemove(result)} />
      <Text color="tan.200" mt="1"><strong>Name:</strong> {result.location}</Text>
      <Text color="tan.200"><strong>Longitude:</strong> {result.longitude}</Text>
      <Text color="tan.200"><strong>Latitude:</strong> {result.latitude}</Text>
    </Box>
  );
};

const GptEditResults = ({ closeGptModal }: GptEditResultsProps) => {
  const dispatch = useAppDispatch();
  const setGptMarkers = (markers: Array<Marker>) => {
     dispatch(setGptMarkersAction(markers));
  };

  const [results, setResults] = useState(initialResults);

  const handleRemove = (resultToRemove: Marker) => {
    setResults(prevResults => prevResults.filter(result => result.location !== resultToRemove.location));
  };

  const handleSubmit = () => {
    setGptMarkers(results);
    closeGptModal();
  };

  return (
    <Box width="100%" margin="0 auto">
      <Text fontSize="xl" color="tan.200" fontWeight="bold" textAlign="center" marginBottom="2">
        Edit GPT Results
      </Text>
      <Flex 
        flexWrap="wrap" 
        justifyContent="space-between"
        overflow="scroll"
        overflowX="hidden"
        height="60vh"
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgb(225,214,196)`,
          },
          }}
      >
        {results.map(result => (
          <ResultItem key={result.location} result={result} onRemove={handleRemove} />
        ))}
      </Flex>
      <Flex justifyContent="center" marginTop="2">
        <Button colorScheme="blue" onClick={handleSubmit}>Confirm Selection</Button>
      </Flex>
    </Box>
  );
};

export default GptEditResults;