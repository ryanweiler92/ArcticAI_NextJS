'use client';

import { useEffect } from 'react';
import MapboxVectorLayer from 'ol/layer/MapboxVector.js';
import OSM from 'ol/source/OSM.js';
import BingMaps from 'ol/source/BingMaps.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';
import LayerGroup from 'ol/layer/Group';
import { useMapContext } from '@context/MapContext';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setLoadLayersAction } from '@redux/slices/mapSlice';
import { LayerToAdd } from '@redux/types';

const mapTilerK = process.env.NEXT_PUBLIC_MAP_TILER_KEY || 'DEFAULT KEY';
const bingK = process.env.NEXT_PUBLIC_BING_KEY || 'DEFAULT KEY';

const AddTileLayer = () => {
  const layerToAddRedux = useAppSelector((state) => state.map.layerToAdd);
  const loadLayers = useAppSelector((state) => state.map.loadLayers);
  const availableLayers = useAppSelector((state) => state.map.availableLayers);

  const dispatch = useAppDispatch();
  const setLoadLayers = (value: boolean) => {
    dispatch(setLoadLayersAction(value));
  };

  const { map } = useMapContext();

  const addBingMap = async (layerToAdd: LayerToAdd) => {
      const { imagerySet, title } = layerToAdd;

      const bingLayer = new TileLayer({
        source: new BingMaps({
          key: bingK,
          imagerySet: imagerySet,
        }),
      });
      bingLayer.set('id', title);

      let olLayers = map.getLayers();
      
      // Attempt to find the baseLayersGroup
      let baseLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'baseLayersGroup');

      // If not found, create it
      if (!baseLayersGroup) {
        baseLayersGroup = new LayerGroup();
        baseLayersGroup.set('id', 'baseLayersGroup');
        map.addLayer(baseLayersGroup);
      }

      // Now add the bingLayer to the baseLayersGroup
      baseLayersGroup.getLayers().push(bingLayer);
  };

  const addOSM = (layerToAdd: LayerToAdd) => {
    const { title } = layerToAdd;
    const osm = new TileLayer({ source: new OSM() });
    osm.set('id', title);
    let olLayers = map.getLayers();

    let baseLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'baseLayersGroup');

    // If not found, create it
    if (!baseLayersGroup) {
      baseLayersGroup = new LayerGroup();
      baseLayersGroup.set('id', 'baseLayersGroup');
      map.addLayer(baseLayersGroup);
    }

    baseLayersGroup.getLayers().push(osm);
  };

  const addMapTilerLayer = async (layerToAdd: LayerToAdd) => {
    const { styleUrl, title } = layerToAdd;
    const url = styleUrl + mapTilerK;

    const xyzSource = new XYZ({
      url: url,
      tileSize: 512,
      crossOrigin: 'anonymous',
    });

    const mapTilerLayer = new TileLayer({ source: xyzSource });
    mapTilerLayer.set('id', title);

    let olLayers = map.getLayers();
    let baseLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'baseLayersGroup');

    if (!baseLayersGroup) {
      baseLayersGroup = new LayerGroup();
      baseLayersGroup.set('id', 'baseLayersGroup');
      map.addLayer(baseLayersGroup);
    }
      
    baseLayersGroup.getLayers().push(mapTilerLayer);
  };

  const addMapTilerVectorLayer = async (layerToAdd: LayerToAdd) => {
    const { styleUrl, title } = layerToAdd;
    const url = styleUrl + mapTilerK;

    const mapTilerLayer = new MapboxVectorLayer({
      styleUrl: url,
    });
    mapTilerLayer.set('id', title);
    let olLayers = map.getLayers();
    let baseLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'baseLayersGroup');

    if (!baseLayersGroup) {
      baseLayersGroup = new LayerGroup();
      baseLayersGroup.set('id', 'baseLayersGroup');
      map.addLayer(baseLayersGroup);
    }

    baseLayersGroup.getLayers().push(mapTilerLayer);
  };

  const handleAddLayer = (layerToAdd: LayerToAdd) => {
    const { source } = layerToAdd;

    switch (source) {
      case 'BingMaps':
        return addBingMap(layerToAdd);
      case 'OSM':
        return addOSM(layerToAdd);
      case 'MapTiler':
        return addMapTilerLayer(layerToAdd);
      case 'MapTilerVector':
        return addMapTilerVectorLayer(layerToAddRedux);
      default:
        console.error('Unkown source ', source);
        return;
    }
  };

  // adding layers from add layer menu
  useEffect(() => {
    if (!map) return;
    handleAddLayer(layerToAddRedux);
  }, [layerToAddRedux]);

  // loading layers from saved map
  useEffect(() => {
    if (!map || !loadLayers) return;

    for (let i = availableLayers.length - 1; i >= 0; i--) {
      const layer = availableLayers[i];
      if (layer.isActive) {
        const { source } = layer;
        switch (source) {
          case 'BingMaps':
            addBingMap(layer);
            break;
          case 'OSM':
            addOSM(layer);
            break;
          case 'MapTiler':
            addMapTilerLayer(layer);
            break;
          case 'MapTilerVector':
            addMapTilerVectorLayer(layer);
            break;
          default:
            console.error('Unkown source ', source);
            return;
        }
      }
    }
    setLoadLayers(false);
  }, [loadLayers]);

  return null;
};

export default AddTileLayer;
