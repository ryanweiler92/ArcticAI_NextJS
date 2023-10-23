'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface MapContextType {
  map: any;
  setMap: (map: any) => void;
}

const initialState: MapContextType = {
  map: null,
  setMap: (map: any) => {},
};

const MapContext = createContext<MapContextType>(initialState);

export function useMapContext() {
  return useContext(MapContext);
}

type Props = {
  children: ReactNode;
};

export function MapProvider({ children }: Props) {
  const [map, setMap] = useState(null);
  const value = {
    map,
    setMap,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
