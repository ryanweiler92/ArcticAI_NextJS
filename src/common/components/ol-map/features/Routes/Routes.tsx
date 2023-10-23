'use client';

import { useEffect } from 'react';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { LineString } from 'ol/geom';
import VectorSource from 'ol/source/Vector.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import LayerGroup from 'ol/layer/Group';
import { transform } from 'ol/proj';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  setRoutesAction,
  removeRouteAction,
  setCloseSimpleRoutesMenuAction,
  setColorLoadingAction,
  setLoadRoutesAction,
} from '@redux/slices/routesSlice';
import { Route } from '@redux/types';
import { useMapContext } from '@context/MapContext';
import { orsRequest } from '@handlers/apiHandlers';

const Routes = () => {
  const routeToAdd = useAppSelector((state) => state.routes.routeToAdd);
  const colorLoading = useAppSelector((state) => state.routes.colorLoading);
  const routesToRemove = useAppSelector((state) => state.routes.routesToRemove);
  const loadRoutes = useAppSelector((state) => state.routes.loadRoutes);
  const selectedMapRoutes = useAppSelector(
    (state) => state.map.selectedMap.routes
  );

  const dispatch = useAppDispatch();
  const addRouteToStore = (route: Route) => {
    dispatch(setRoutesAction(route));
  };
  const closeSimpleRoutesMenu = () => {
    dispatch(setCloseSimpleRoutesMenuAction(true));
  };
  const setColorLoading = (loading: boolean) => {
    dispatch(setColorLoadingAction(loading));
  };
  const removeRoute = (id: string) => {
    dispatch(removeRouteAction(id));
  };
  const setLoadRoutes = (loading: boolean) => {
    dispatch(setLoadRoutesAction(loading));
  };

  const { map } = useMapContext();

  useEffect(() => {
    if (routeToAdd.startLon === 0 && routeToAdd.startLat === 0) return;

    handleCreateRoute(routeToAdd);
  }, [routeToAdd]);

  useEffect(() => {
    if (routesToRemove) {
      routesToRemove.forEach((id: string) => {
        handleRemoveRoute(id);
      });
    }
  }, [routesToRemove]);

  // listen for loading routes action
  useEffect(() => {
    if (loadRoutes && selectedMapRoutes) {
      selectedMapRoutes.forEach((route: Route) => {
        handleCreateRoute(route);
      });
    }
    setLoadRoutes(false);
  }, [loadRoutes]);

  const handleRouteRequest = async (
    startCoords: Array<number>,
    endCoords: Array<number>
  ) => {
    const result = await orsRequest(startCoords, endCoords);
    return result;
  };

  const removeLayer = (id: string) => {
    const layers = map.getLayers();

    const layer = layers.array_.find((layer: any) => layer.values_.id === id);
    if (layer) {
      map.removeLayer(layer);
    }
  };

  const handleRemoveRoute = (id: string) => {
    removeRoute(id);
    removeLayer(id);
    removeLayer(id + 'MARKER');
  };

  const handleCreateRoute = async (routeToAdd: Route) => {
    const { startLon, startLat, endLon, endLat } = routeToAdd;
    const endCoords = [endLat, endLon];
    const startCoords = [startLat, startLon];

    try {
      const routeRequest = await handleRouteRequest(startCoords, endCoords);

      const route = routeRequest.features[0];
      const routeCoordinates = route.geometry.coordinates.map(
        (coordinate: any) => transform(coordinate, 'EPSG:4326', 'EPSG:3857')
      );

      const routeLine = new LineString(routeCoordinates);

      const geoMarker = new Feature({
        type: 'geoMarker',
        geometry: new Point(routeLine.getFirstCoordinate()),
      });

      const markerSource = new VectorSource({
        features: [geoMarker],
      });

      const markerStyle = new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: 'black' }),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      });

      const markerLayer = new VectorLayer({
        source: markerSource,
        style: markerStyle,
      });

      const routeSource = new VectorSource({
        features: [new Feature({ geometry: routeLine })],
      });

      const lineColor = routeToAdd.color === '' ? '#DFFB25' : routeToAdd.color;

      const routeLayer = new VectorLayer({
        source: routeSource,
        style: new Style({
          stroke: new Stroke({
            color: lineColor,
            width: 6,
          }),
        }),
      });

      const { id } = routeToAdd;

      routeLayer.set('id', id);
      markerLayer.set('id', id + 'MARKER');

      let olLayers = map.getLayers();

      let routesLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'routesLayersGroup');
      
      // Check and ensure routesLayersGroup exists
      if (!routesLayersGroup) {
        routesLayersGroup = new LayerGroup();
        routesLayersGroup.set('id', 'routesLayersGroup');
        map.addLayer(routesLayersGroup);
      }
      routesLayersGroup.getLayers().push(routeLayer);

      // Check and ensure markersLayersGroup exists
      let markersLayersGroup = olLayers.getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'markersLayersGroup');
      if (!markersLayersGroup) {
        markersLayersGroup = new LayerGroup();
        markersLayersGroup.set('id', 'markersLayersGroup');
        map.addLayer(markersLayersGroup);
      }
      markersLayersGroup.getLayers().push(markerLayer);

      addRouteToStore(routeToAdd);

      if (colorLoading) setColorLoading(false);

      closeSimpleRoutesMenu();
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return null;
};

export default Routes;
