'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ReactDOM from 'react-dom/client';
import Overlay from 'ol/Overlay.js';
import proj4 from 'proj4';
import { containsCoordinate } from 'ol/extent';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Flex,
  Text,
  Divider,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { DeleteIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMapContext } from '@context/MapContext';
import { googleReverseGeocode as reverseGeocode } from '@handlers/apiHandlers';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  setMarkersAction,
  removeMarkerAction as removeMarkerRedux,
  setFlyToCoordinatesAction,
  setLoadMarkersAction,
  clearGptMarkersAction,
} from '@redux/slices/markersSlice';
import {
  setRoutesToRemoveAction,
  setLoadRoutesAction,
} from '@redux/slices/routesSlice';
import { Marker, Route } from '@redux/types';

interface MarkerProps {
  markerTrigger: boolean;
  setMarkerTrigger: (value: boolean) => void;
}

const Markers = ({ markerTrigger, setMarkerTrigger }: MarkerProps) => {
  const markerToAdd = useAppSelector((state) => state.markers.markerToAdd);
  const markerToUpdate = useAppSelector(
    (state) => state.markers.markerToUpdate
  );
  const markers = useAppSelector((state) => state.markers.markers);
  const routes = useAppSelector((state) => state.routes.routes);
  const loadMarkers = useAppSelector((state) => state.markers.loadMarkers);
  const gptMarkers = useAppSelector((state) => state.markers.gptMarkers);

  const dispatch = useAppDispatch();
  const setMarkers = (marker: Marker) => {
    dispatch(setMarkersAction(marker));
  };
  const removeMarkerAction = (id: string) => {
    dispatch(removeMarkerRedux(id));
  };
  const setFlyToCoordinates = (coordinates: Array<number>) => {
    dispatch(setFlyToCoordinatesAction(coordinates));
  };
  const setLoadMarkers = (value: boolean) => {
    dispatch(setLoadMarkersAction(value));
  };
  const setRoutesToRemove = (routes: Array<string>) => {
    dispatch(setRoutesToRemoveAction(routes));
  };
  const setLoadRoutes = (value: boolean) => {
    dispatch(setLoadRoutesAction(value));
  };
  const clearGptMarkers = () => {
    dispatch(clearGptMarkersAction());
  };

  const { map } = useMapContext();

  const routesRef = useRef<Route[] | null>(null);

  const removeAssociatedRoutes = (markerId: string) => {
    if (routesRef.current) {
      const filteredRoutes = routesRef.current
        .filter(
          (route: Route) =>
            route.startMarkerId === markerId || route.endMarkerId === markerId
        )
        .map((route: Route) => route.id);

      if (filteredRoutes) setRoutesToRemove(filteredRoutes);
    }
  };

  const removeMarker = (id: string) => {
    console.log('removing marker', id);
    const overlays = map.getOverlays().getArray().slice();

    overlays.forEach((overlay: any) => {
      if (overlay.id == id) {
        map.removeOverlay(overlay);
      }
    });
    removeAssociatedRoutes(id);
    removeMarkerAction(id);
  };

  // when placing marker with location search, check if outside current extent, if so fly to location
  const checkIfOutsideExtent = (x: number, y: number) => {
    const currentExtent = map.getView().calculateExtent(map.getSize());

    const isInsideMap = containsCoordinate(currentExtent, [x, y]);

    if (!isInsideMap) {
      setFlyToCoordinates([x, y]);
    }
  };

  // handle markers manually added to the map to be reverse geocoded with google
  const handleGoogleMarker = async (x: any, y: any) => {
    const uniqueID = uuidv4();
    const source = 'EPSG:3857';
    const destination = 'EPSG:4326';

    const [lon, lat] = proj4(source, destination, [x, y]);

    let location = await reverseGeocode(lon, lat);

    if (location === undefined) {
      location = 'Address Unavailable';
    }

    const markerData: Marker = {
      clientId: uniqueID,
      location,
      longitude: x,
      latitude: y,
    };

    setMarkers(markerData);

    handleMarkerPlacement(markerData);
  };

  const handleMarkerPlacement = async (markerData: Marker) => {
    const { clientId, location, longitude, latitude } = markerData;

    const markerOverlay = new Overlay({
      position: [longitude, latitude],
      positioning: 'bottom-center',
      element: document.createElement('div'),
      // autoPan: false,
      id: clientId,
    });

    const OverlayDiv = () => {
      const [popoverOpen, setPopoverOpen] = useState(true);

      useEffect(() => {
        setPopoverOpen(popoverOpen);
      }, [markers]);

      return (
        <>
          <Popover isOpen={popoverOpen} placement="top">
            <PopoverTrigger>
              <Button
                onClick={() => setPopoverOpen(true)}
                className="popover-trigger-overrides"
              >
                <Image
                  src="/marker-tac.png"
                  alt="Marker Icon"
                  width={42}
                  height={42}
                  priority={true}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-body-overrides">
              <PopoverArrow />
              <PopoverBody
                backgroundColor="black"
                p="4"
                borderRadius="10"
                sx={{
                  borderColor: 'red.200',
                  borderWidth: '4px',
                  borderStyle: 'groove',
                }}
              >
                <Flex>
                  <Box className="popover-close">
                    <IconButton
                      color="white"
                      icon={<ViewOffIcon />}
                      aria-label="minimize marker"
                      onClick={() => setPopoverOpen(false)}
                    />
                  </Box>
                  <Box className="popover-close">
                    <IconButton
                      aria-label="remove-marker"
                      icon={<DeleteIcon />}
                      color="white"
                      onClick={() => removeMarker(clientId)}
                    />
                  </Box>
                  <Divider
                    orientation="vertical"
                    bg="white"
                    ml={4}
                    width="1px"
                  />
                  <Text color="white" fontWeight="600" ml={8}>
                    {location}
                  </Text>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      );
    };

    /** @ts-ignore */
    const root = ReactDOM.createRoot(markerOverlay.getElement());
    root.render(<OverlayDiv />);

    map.addOverlay(markerOverlay);

    setMarkerTrigger(false);

    map.getTarget().style.cursor = '';

    if (!loadMarkers) {
      checkIfOutsideExtent(longitude, latitude);
    }
  };

  // used to handle marker placement from add marker button
  const getCoordinatePixels = (event: any) => {
    const [x, y] = map.getCoordinateFromPixel(event.pixel);
    handleGoogleMarker(x, y);
  };

  // listen to marker placement event from add marker button
  useEffect(() => {
    if (!map || !markerTrigger) return;

    map.getTarget().style.cursor = 'crosshair';

    map.on('singleclick', getCoordinatePixels);

    return () => {
      map.un('singleclick', getCoordinatePixels);
    };
  }, [markerTrigger]);

  // for adding single marker from add marker button or location search
  useEffect(() => {
    if (!map || !markerToAdd) return;
    handleMarkerPlacement(markerToAdd);
  }, [markerToAdd]);

  // for adding a batch of markers from gpt request
  useEffect(() => {
    if (!map || !gptMarkers.length) return;

    gptMarkers.forEach((marker) => {
      handleMarkerPlacement(marker);
    });

    clearGptMarkers();
  }, [gptMarkers]);

  // for updating marker names from the active markers display
  useEffect(() => {
    if (!map || !markerToUpdate) return;
    handleMarkerPlacement(markerToUpdate);
  }, [markerToUpdate]);

  // for keeping track of routes when removing markers from closures
  useEffect(() => {
    routesRef.current = routes || [];
  }, [routes]);

  // for loading markers from saved map
  useEffect(() => {
    if (!map || !loadMarkers) return;

    const overlays = map.getOverlays();

    overlays.forEach((overlay: any) => {
      map.removeOverlay(overlay);
    });

    markers.forEach((marker) => {
      handleMarkerPlacement(marker);
    });

    setLoadMarkers(false);
    // load routes after finished loading markers
    setLoadRoutes(true);
  }, [loadMarkers]);

  return null;
};

export default Markers;
