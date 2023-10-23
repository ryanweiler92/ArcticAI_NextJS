'use client';

import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM.js';
import BingMaps from 'ol/source/BingMaps.js';
import TileLayer from 'ol/layer/Tile.js';
import { Vector as VectorLayer } from 'ol/layer';
import LayerGroup from 'ol/layer/Group';
import { Vector as VectorSource } from 'ol/source';
import { Flex, Box } from '@chakra-ui/react';
import 'ol/ol.css';
import { useMapContext } from '@context/MapContext';
import Navbar from '@components/ol-map/navbar/Navbar';
import MapEvents from '@components/ol-map/map-properties/MapEventListeners';
import LeftControlsLayout from '@components/ol-map/control-layouts/LeftControlsLayout';
import RightControlsLayout from '@components/ol-map/control-layouts/RightControlsLayout';
import BottomControlsLayout from '@components/ol-map/control-layouts/BottomControlsLayout';
import OnMapControls from '@components/ol-map/on-map-controls/OnMapControls';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  setLayerToAddAction,
  setSavedMapsAction,
} from '@redux/slices/mapSlice';
import { SavedMap } from '@redux/types';
import { useIsMobile } from '@hooks/hooks';
import { getUserMaps } from '@handlers/mapHandlers';
const bingK = process.env.NEXT_PUBLIC_BING_KEY || 'DEFAULT KEY';

const OlMap = () => {
  const availableLayers = useAppSelector((state) => state.map.availableLayers);
  const authenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const setLayerToAdd = (layerToAdd: any) => {
    dispatch(setLayerToAddAction(layerToAdd));
  };

  useEffect(() => {
    const fetchData = async () => {
      const maps = await getUserMaps();
      setSavedMaps(maps);
    };
    if (authenticated) fetchData();
  }, [authenticated]);

  const setSavedMaps = (savedMaps: SavedMap) => {
    dispatch(setSavedMapsAction(savedMaps));
  };

  const mapRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  const { map, setMap } = useMapContext();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const initializeMap = async () => {
    const bingAerial = new TileLayer({
      source: new BingMaps({
        key: bingK,
        imagerySet: 'AerialWithLabelsOnDemand',
      }),
    });
    bingAerial.set('id', 'Aerial Bing Map');

    const osm = new TileLayer({ source: new OSM() });
    osm.set('id', 'Open Streets Map');

    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    markerLayer.set('id', 'marker-layer');

    const alexandria = fromLonLat([-77.050552, 38.82045]);

    // Create the Layer Groups
    const baseLayersGroup = new LayerGroup();
    const routesLayersGroup = new LayerGroup();
    const markersLayersGroup = new LayerGroup();

    baseLayersGroup.set('id', 'baseLayersGroup');
    routesLayersGroup.set('id', 'routesLayersGroup');
    markersLayersGroup.set('id', 'markersLayersGroup');

    // Adding initial layers to their respective groups.
    baseLayersGroup.getLayers().extend([bingAerial, osm]);
    markersLayersGroup.getLayers().push(markerLayer);

    const map = new Map({
      target: 'map',
      layers: [baseLayersGroup, routesLayersGroup, markersLayersGroup],
      view: new View({
        center: alexandria,
        zoom: 12,
      }),
    });
    if (mapRef.current) {
      map.setTarget(mapRef.current);
    }
    setMap(map);
  };

  useEffect(() => {
    if (mapRef.current && !map) {
      initializeMap();
    }

    return () => map.setTarget(undefined);
  }, []);

  const addInitialLayers = () => {
    availableLayers.map((layer) => {
      if (layer.isActive) {
        return setLayerToAdd(layer);
      }
    });
  };

  useEffect(() => {
    if (map && availableLayers && !initialLoad) {
      setInitialLoad(true);
    }
  }, [map]);

  // initial loading of map
  useEffect(() => {
    if (map && availableLayers && initialLoad) {
      addInitialLayers();
    }
  }, [initialLoad]);

  // resize map on window resize
  useEffect(() => {
      const handleResize = () => {
          if (map && mapRef.current) {
              setTimeout(function() {
                  map.updateSize();
              }, 100);

          }
      };

      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, [map]);

  const mobileStyle = isMobile
    ? {
        display: 'none',
        width: '0px',
      }
    : {};

  return (
    <>
      {!isMobile && <Navbar />}

      <Flex>
        <Box className="sidebarControls" style={mobileStyle}>
          <LeftControlsLayout />
        </Box>
        <Box id="map" ref={mapRef} className={isMobile ? 'mobileMapStyle' : ''}>
          {isMobile && <BottomControlsLayout />}
        </Box>
        <Box className="sidebarControls" style={mobileStyle}>
          <RightControlsLayout />
        </Box>
      </Flex>
      {!isMobile && (
        <Box id="bottom-controls">
          <BottomControlsLayout />
        </Box>
      )}

      {/** @ts-ignore */}
      <MapEvents />
      <OnMapControls />
    </>
  );
};

export default OlMap;
