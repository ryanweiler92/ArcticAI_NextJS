'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import MapProperties from '@components/ol-map/map-properties/MapProperties';
import RoutesSideDisplay from '@components/ol-map/features/Routes/RoutesSideDisplay';

const LeftControlsLayout = () => {
  return (
    <Box className="side-controls-layout">
      <MapProperties />
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
        <RoutesSideDisplay />
      </Box>
    </Box>
  );
};

export default LeftControlsLayout;
