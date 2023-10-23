'use client';

import { toLonLat } from 'ol/proj';
import { toStringXY } from 'ol/coordinate';
import { useMapContext } from '@context/MapContext';
import { useAppDispatch } from '@redux/hooks';
import { setViewPropertiesAction } from '@redux/slices/mapSlice';
import { ViewProperties } from '@redux/types';

const MapEvents = () => {
  const dispatch = useAppDispatch();
  const updateViewProperties = (newViewProperties: ViewProperties) => {
    dispatch(setViewPropertiesAction(newViewProperties));
  };

  const { map } = useMapContext();

  if (!map) return;

  // listen to event changes after the map has finished moving
  map.on('moveend', function () {
    const mapView = map.getView();

    const properties = mapView.getProperties();
    const { center, resolution, rotation, zoom } = properties;

    const zoomFloor = Math.floor(zoom);
    const wgs84Coordinates = toLonLat(center);
    const xyCoordinates = toStringXY(wgs84Coordinates, 4);
    const yxCoordinates = xyCoordinates.split(', ').reverse().join(', ');
    const resolutionFloor = Math.floor(resolution);

    updateViewProperties({
      centerCoords: center,
      latlonCoords: yxCoordinates,
      resolution: resolutionFloor,
      rotation: rotation,
      zoom: zoomFloor,
    });
  });

  return null;
};

export default MapEvents;
