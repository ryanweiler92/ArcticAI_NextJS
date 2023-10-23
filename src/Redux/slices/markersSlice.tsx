import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarkersInitialState, Marker } from '@redux/types';

const initialState: MarkersInitialState = {
  flyToCoordinates: [],
  loadMarkers: false,
  markers: [],
  gptMarkers: [],
  markerToAdd: {
    clientId: '',
    location: '',
    latitude: 0,
    longitude: 0,
  },
  markerToUpdate: {
    clientId: '',
    location: '',
    latitude: 0,
    longitude: 0,
  },
};

export const markersSlice = createSlice({
  name: 'markerActions',
  initialState: initialState,
  reducers: {
    // a list of all of the active markers
    setMarkersAction: (state, action: PayloadAction<Marker>) => {
      state.markers.push(action.payload);
    },
    // clear the list of all active markers
    clearMarkersAction: (state) => {
      state.markers = [];
    },
    setGptMarkersAction: (state, action: PayloadAction<Array<Marker>>) => {
      state.gptMarkers = action.payload;
    },
    clearGptMarkersAction: (state) => {
      state.gptMarkers = [];
    },
    // remove a single marker from the list of active markers
    removeMarkerAction: (state, action: PayloadAction<string>) => {
      state.markers = state.markers.filter(
        (marker) => marker.clientId !== action.payload
      );
    },
    // we need this to inform open layers of what marker to add
    setMarkerToAddAction: (state, action: PayloadAction<Marker>) => {
      state.markerToAdd = action.payload;
    },
    // we need this to inform open layers to remove the updated marker and add a new one
    setMarkerToUpdateAction: (state, action: PayloadAction<Marker>) => {
      state.markerToUpdate = action.payload;
    },
    // for updating the name of markers in the redux store, should be called in conjunction with setMarkerToUpdateAction
    updateMarkerNameAction: (
      state,
      action: PayloadAction<{ clientId: string; location: string }>
    ) => {
      state.markers = state.markers.map((marker) => {
        if (marker.clientId === action.payload.clientId) {
          return { ...marker, location: action.payload.location };
        }
        return marker;
      });
    },
    // boolean to tell marker/layer components to remove layers/markers and load saved map data
    setLoadMarkersAction: (state, action: PayloadAction<boolean>) => {
      state.loadMarkers = action.payload;
    },
    // for setting coordinates to fly to
    setFlyToCoordinatesAction: (state, action: PayloadAction<any>) => {
      state.flyToCoordinates = action.payload;
    },
  },
});

export const {
  setMarkerToUpdateAction,
  setMarkersAction,
  clearMarkersAction,
  removeMarkerAction,
  setMarkerToAddAction,
  setLoadMarkersAction,
  setFlyToCoordinatesAction,
  updateMarkerNameAction,
  setGptMarkersAction,
  clearGptMarkersAction
} = markersSlice.actions;

export default markersSlice.reducer;
