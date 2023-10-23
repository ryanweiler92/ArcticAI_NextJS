'use client';

import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import MarkerButton from '../features/Markers/MarkerButton';
import Markers from '../features/Markers/Markers';
import ClearMarkersButton from '../features/Markers/ClearMarkersButton';
import ConsoleTester from '../interactions/ConsoleTester';
import LayerModalButton from '../layers/layer-selectors/AddLayerModalButton';
import AvailableLayerModal from '../layers/layer-selectors/ModalAvailableLayer';
import FlyToLocation from '../features/Markers/FlyToLocation';
import SaveMapButton from '../interactions/save-map/SaveMapButton';
import SaveMapModal from '../interactions/save-map/SaveMapModal';
import LoadEditMapsButton from '../interactions/managed-saved-maps/LoadEditMapsButton';
import LoadEditMapsModal from '../interactions/managed-saved-maps/LoadEditMapsModal';
import RoutesButton from '../features/Routes/RoutesButton';
import SimpleRouteMenu from '../features/Routes/SimpleRouteMenu';
import Routes from '../features/Routes/Routes';
import RouteColorMenu from '@components/ol-map/features/Routes/RouteColorMenu';
import RouteAnimation from '@components/ol-map/features/Routes/RouteAnimation';
import { useIsMobile } from '@hooks/hooks';
import ManageMapsMobileButton from '@components/mobile/ManageMapsMobileButton';
import MarkerMobileButton from '@components/mobile/MarkerMobileButton';
import LayersMobileButton from '@components/mobile/LayersMobileButton';
import RoutesMobileButton from '@components/mobile/RoutesMobileButton';
import ActiveMarkersModal from '@components/ol-map/features/Markers/MarkersModal';
import ManageLayersModal from '@components/ol-map/layers/layer-selectors/ManageLayersModal';
import GptButton from '@components/ol-map/features/GPT/GptButton';
import GptModal from '@components/ol-map/features/GPT/GptModal';
import { useAppSelector } from '@redux/hooks';

const BottomControlsLayout = () => {
  const authenticated = useAppSelector((state) => state.user.isAuthenticated);

  const [markerTrigger, setMarkerTrigger] = useState<boolean>(false);
  const triggerMarker = () => {
    setMarkerTrigger(!markerTrigger);
  };
  const [layerModalOpen, setLayerModalOpen] = useState<boolean>(false);
  const openLayerModal = () => setLayerModalOpen(true);

  const [saveMapModal, setSaveMapModal] = useState<boolean>(false);
  const openSaveMapModal = () => setSaveMapModal(true);
  const closeSaveMapModal = () => setSaveMapModal(false);

  const [manageMapsModal, setManageMapsModal] = useState<boolean>(false);
  const openManageMapsModal = () => setManageMapsModal(true);
  const closeManageMapsModal = () => setManageMapsModal(false);

  const [routesMenuOpen, setRoutesMenuOpen] = useState<boolean>(false);
  const openRoutesMenu = () => setRoutesMenuOpen(true);
  const closeRoutesMenu = () => setRoutesMenuOpen(false);

  const [markersModalOpen, setMarkersModalOpen] = useState<boolean>(false);
  const openMarkersModal = () => setMarkersModalOpen(true);
  const closeMarkersModal = () => setMarkersModalOpen(false);

  const [manageLayersModalOpen, setManageLayersModalOpen] =
    useState<boolean>(false);
  const openManageLayersModal = () => setManageLayersModalOpen(true);
  const closeManageLayersModal = () => setManageLayersModalOpen(false);

  const [gptModalOpen, setGptModalOpen] = useState<boolean>(false);
  const openGptModal = () => setGptModalOpen(true);
  const closeGptModal = () => setGptModalOpen(false);

  const isMobile = useIsMobile();

  const MobileButtonLayout = (
    <Flex
      id="bottom-controls-mobile"
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2'}
    >
      <ManageMapsMobileButton
        openSaveMapModal={openSaveMapModal}
        openManageMapsModal={openManageMapsModal}
      />
      <MarkerMobileButton
        triggerMarker={triggerMarker}
        openMarkersModal={openMarkersModal}
      />
      <LayersMobileButton
        openLayerModal={openLayerModal}
        openManageLayersModal={openManageLayersModal}
      />
      <RoutesMobileButton openRoutesMenu={openRoutesMenu} />
    </Flex>
  );

  const DesktopButtonLayout = (
    <Flex
      id="bottom-controls-layout"
      alignItems={'center'}
      justifyContent={'center'}
      gap={'8'}
    >
      {authenticated ? (
        <>
          <LoadEditMapsButton openModal={openManageMapsModal} />
          <SaveMapButton openSaveMapModal={openSaveMapModal} />
        </>
      ) : null}

      <MarkerButton triggerMarker={triggerMarker} />
      <ClearMarkersButton />
      <LayerModalButton
        layerModalOpen={layerModalOpen}
        setLayerModalOpen={setLayerModalOpen}
      />
      <RoutesButton openRoutesMenu={openRoutesMenu} />
      {/* <GptButton openGptModal={openGptModal} />
      <ConsoleTester /> */}
    </Flex>
  );

  return (
    <>
      <SaveMapModal modalState={saveMapModal} closeModal={closeSaveMapModal} />
      <LoadEditMapsModal
        modalState={manageMapsModal}
        closeModal={closeManageMapsModal}
      />
      <Markers
        markerTrigger={markerTrigger}
        setMarkerTrigger={setMarkerTrigger}
      />
      <AvailableLayerModal
        layerModalOpen={layerModalOpen}
        setLayerModalOpen={setLayerModalOpen}
      />
      <FlyToLocation />
      <SimpleRouteMenu
        closeRoutesMenu={closeRoutesMenu}
        routesMenuOpen={routesMenuOpen}
      />
      <RouteColorMenu />
      <Routes />
      <RouteAnimation />
      {isMobile ? MobileButtonLayout : DesktopButtonLayout}
      <ActiveMarkersModal
        markersModalOpen={markersModalOpen}
        closeMarkersModal={closeMarkersModal}
      />
      <ManageLayersModal
        manageLayersModalOpen={manageLayersModalOpen}
        closeManageLayersModal={closeManageLayersModal}
      />
      <GptModal gptModalOpen={gptModalOpen} closeGptModal={closeGptModal} />
    </>
  );
};

export default BottomControlsLayout;
