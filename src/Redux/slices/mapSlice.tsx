import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import InitialState, { ViewProperties, LayerToAdd, SavedMap } from '../types';
import config from '../../common/config/config';
import layerConfig from 'common/config/layerConfig';

const {
  projections: { webMercator },
} = config;

const initialState: InitialState = {
  availableLayers: layerConfig,
  layerToAdd: {
    title: '',
    source: '',
    imagerySet: '',
    type: '',
    styleUrl: '',
  },
  selectedMap: {
    id: 999,
    name: 'default',
    description: 'default',
    markers: [],
    layers: [],
    routes: [],
    zoom: 2,
    latitude: 0,
    longitude: 0,
    saveSlot: 0,
    createdAt: '',
    updatedAt: '',
    ownerId: '',
  },
  loadLayers: false,
  projection: webMercator,
  savedMaps: [],
  viewProperties: {
    centerCoords: [0, 0],
    latlonCoords: '0, 0',
    resolution: 38496,
    rotation: 0,
    zoom: 2,
  },
};

export const mapSlice = createSlice({
  name: 'mapActions',
  initialState: initialState,
  reducers: {
    // for setting lat, lon, zoom, resolution, rotation
    setViewPropertiesAction: (state, action: PayloadAction<ViewProperties>) => {
      state.viewProperties = action.payload;
    },
    // for adding a single layer
    setLayerToAddAction: (state, action: PayloadAction<LayerToAdd>) => {
      state.layerToAdd = action.payload;
    },
    // for updating the state of the layers (ex. visible, active)
    setAvailableLayersAction: (state, action: PayloadAction<any>) => {
      state.availableLayers = action.payload;
    },
    setLoadLayersAction: (state, action: PayloadAction<boolean>) => {
      state.loadLayers = action.payload;
    },
    // set an array of the users saved maps when we grab severSideProps
    setSavedMapsAction: (state, action: PayloadAction<any>) => {
      state.savedMaps = action.payload;
    },
    setSelectedMapAction: (state, action: PayloadAction<SavedMap>) => {
      state.selectedMap = action.payload;
    },
  },
});

export const {
  setViewPropertiesAction,
  setLayerToAddAction,
  setLoadLayersAction,
  setAvailableLayersAction,
  setSavedMapsAction,
  setSelectedMapAction,
} = mapSlice.actions;

export default mapSlice.reducer;
