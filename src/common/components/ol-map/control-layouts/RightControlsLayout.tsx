'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import AddLayer from '../layers/add-layers/AddLayer';
import ActiveLayers from '../layers/layer-selectors/ActiveLayers';
import MarkersDisplay from '../features/Markers/MarkersSideDisplay';

const RightControlsLayout = () => {
  return (
    <Box className="side-controls-layout" height="100%">
      <Box
        height="50%"
        overflow="scroll"
        overflowX="hidden"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgb(225,214,196)`,
          },
        }}
      >
        <ActiveLayers />
      </Box>
      <Box
        height="49%"
        overflow="scroll"
        overflowX="hidden"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgb(225,214,196)`,
          },
        }}
      >
        <MarkersDisplay />
      </Box>
      <AddLayer />
    </Box>
  );
};

export default RightControlsLayout;
