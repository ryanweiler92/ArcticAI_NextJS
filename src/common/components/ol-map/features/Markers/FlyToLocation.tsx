'use client';

import { useEffect } from 'react';
import { useMapContext } from '@context/MapContext';
import { useAppSelector } from '@redux/hooks';

const FlyToLocation = () => {
  const flyToCoordinates = useAppSelector(
    (state) => state.markers.flyToCoordinates
  );
  const { map } = useMapContext();

  function flyTo(location: Array<Number>, done: any) {
    const duration = 2000;
    const view = map.getView();
    const zoom = map.getView().getZoom();
    let parts = 2;
    let called = false;
    function callback(complete: any) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );
    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom,
        duration: duration / 2,
      },
      callback
    );
  }

  useEffect(() => {
    if (!map || !flyToCoordinates) return;

    flyTo(flyToCoordinates, () => {});
  }, [flyToCoordinates]);

  return null;
};

export default FlyToLocation;
