'use client';

import { useRef, useEffect } from 'react';
import LayerGroup from 'ol/layer/Group';
import { useMapContext } from '@context/MapContext';
import { useAppSelector } from '@redux/hooks';

const RouteAnimation = () => {
  const routeToUpdate = useAppSelector((state) => state.routes.routeToUpdate);
  const { map } = useMapContext();
  // Store the animation frame IDs for each route in a ref
  const animations = useRef(new Map());

  useEffect(() => {
    if (routeToUpdate.id === '') return;

    if (routeToUpdate.isAnimating) {
      playAnimation();
    } else {
      stopAnimation();
    }
  }, [routeToUpdate]);

  const playAnimation = () => {
    const { id } = routeToUpdate;
    const markerId = id + 'MARKER';

    const routesLayersGroup = map.getLayers().getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'routesLayersGroup');
    const markersLayersGroup = map.getLayers().getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'markersLayersGroup');

    const routeLayer = routesLayersGroup?.getLayers().getArray().find((layer: any) => layer.get('id') === id);
    const markerLayer = markersLayersGroup?.getLayers().getArray().find((layer: any) => layer.get('id') === markerId);

    const routeLine = routeLayer.getSource().getFeatures()[0].getGeometry();
    const geoMarker = markerLayer
      .getSource()
      .getFeatures()
      .find((feature: any) => feature.get('type') === 'geoMarker');

    const duration = 8000;
    const start = new Date().getTime();
    const animate = () => {
      const elapsedTime = (new Date().getTime() - start) % duration;
      let fraction = elapsedTime / duration;

      if (fraction > 0.5) {
        fraction = 1 - fraction;
      }

      const currentCoordinate = routeLine.getCoordinateAt(2 * fraction);
      geoMarker.getGeometry().setCoordinates(currentCoordinate);

      // Schedule the next animation frame and store its ID
      const animationFrameId = requestAnimationFrame(animate);
      animations.current.set(id, animationFrameId);
    };

    // Start the animation
    animate();
  };

  const stopAnimation = () => {
    const { id } = routeToUpdate;
    const markerId = id + 'MARKER';

    const routesLayersGroup = map.getLayers().getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'routesLayersGroup');
    const markersLayersGroup = map.getLayers().getArray().find((layer: any) => layer instanceof LayerGroup && layer.get('id') === 'markersLayersGroup');

    const routeLayer = routesLayersGroup?.getLayers().getArray().find((layer: any) => layer.get('id') === id);
    const markerLayer = markersLayersGroup?.getLayers().getArray().find((layer: any) => layer.get('id') === markerId);

    const routeLine = routeLayer.getSource().getFeatures()[0].getGeometry();
    const geoMarker = markerLayer
      .getSource()
      .getFeatures()
      .find((feature: any) => feature.get('type') === 'geoMarker');

    // Cancel the animation frame for the route using the stored ID
    const animationFrameId = animations.current.get(id);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animations.current.delete(id);
    }

    // Reset the position of the geoMarker to the starting point
    const startPosition = routeLine.getFirstCoordinate();
    geoMarker.getGeometry().setCoordinates(startPosition);
    map.render();
  };

  return null;
};

export default RouteAnimation;
