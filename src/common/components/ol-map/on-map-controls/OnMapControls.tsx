'use client';

import { useEffect } from 'react';
import { FullScreen, OverviewMap, ScaleLine, ZoomSlider } from 'ol/control';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { useMapContext } from '@context/MapContext';

const OnMapControls = () => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;
    const fullScreenControl = new FullScreen({});
    const scaleLineControl = new ScaleLine({});
    const zoomSliderControl = new ZoomSlider({});
    // const overviewMapControl = new OverviewMap({
    //   className: 'ol-overviewmap ol-custom-overviewmap',
    //   layers: [
    //     new TileLayer({
    //       source: new OSM({
    //         url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
    //       }),
    //     }),
    //   ],
    //   collapseLabel: '\u00BB',
    //   label: '\u00AB',
    //   collapsed: false,
    // });

    const controls = [
      fullScreenControl,
      scaleLineControl,
      zoomSliderControl,
      // overviewMapControl,
    ];

    controls.map((control) => map.controls.push(control));

    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  return null;
};

export default OnMapControls;
