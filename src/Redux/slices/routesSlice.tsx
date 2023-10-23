import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesInitialState, Route } from '@redux/types';

const initialState: RoutesInitialState = {
  closeSimpleRoutesMenu: false,
  loadRoutes: false,
  routes: [],
  routeToAdd: {
    id: '',
    routeName: '',
    startLon: 0,
    startLat: 0,
    endLon: 0,
    endLat: 0,
    color: '',
    isAnimating: false,
    startMarkerId: '',
    endMarkerId: '',
  },
  routeToUpdate: {
    id: '',
    routeName: '',
    startLon: 0,
    startLat: 0,
    endLon: 0,
    endLat: 0,
    color: '',
    isAnimating: false,
    startMarkerId: '',
    endMarkerId: '',
  },
  openColorMenu: false,
  colorLoading: false,
  routesToRemove: [],
};

export const routesSlice = createSlice({
  name: 'routesActions',
  initialState: initialState,
  reducers: {
    setRouteToAddAction: (state, action: PayloadAction<any>) => {
      state.routeToAdd = action.payload;
    },
    clearRoutesAction: (state) => {
      state.routes = [];
    },
    setRoutesAction: (state, action: PayloadAction<any>) => {
      state.routes.push(action.payload);
    },
    setCloseSimpleRoutesMenuAction: (state, action: PayloadAction<boolean>) => {
      state.closeSimpleRoutesMenu = action.payload;
    },
    openColorMenuAction: (state, action: PayloadAction<boolean>) => {
      state.openColorMenu = action.payload;
    },
    setRouteToUpdateAction: (state, action: PayloadAction<Route>) => {
      state.routeToUpdate = action.payload;
    },
    updateRouteNameAction: (
      state,
      action: PayloadAction<{ id: string; routeName: string }>
    ) => {
      state.routes = state.routes.map((route) => {
        if (route.id === action.payload.id) {
          return { ...route, routeName: action.payload.routeName };
        }
        return route;
      });
    },
    updateRouteAnimationAction: (
      state,
      action: PayloadAction<{ id: string; isAnimating: boolean }>
    ) => {
      state.routes = state.routes.map((route) => {
        if (route.id === action.payload.id) {
          return { ...route, isAnimating: action.payload.isAnimating };
        }
        return route;
      });
    },
    removeRouteAction: (state, action: PayloadAction<string>) => {
      state.routes = state.routes.filter(
        (route) => route.id !== action.payload
      );
    },
    setColorLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.colorLoading = action.payload;
    },
    setRoutesToRemoveAction: (state, action: PayloadAction<string[]>) => {
      state.routesToRemove = action.payload;
    },
    setLoadRoutesAction: (state, action: PayloadAction<boolean>) => {
      state.loadRoutes = action.payload;
    },
  },
});

export const {
  setRouteToAddAction,
  setRoutesAction,
  setCloseSimpleRoutesMenuAction,
  openColorMenuAction,
  updateRouteNameAction,
  setRouteToUpdateAction,
  removeRouteAction,
  setColorLoadingAction,
  updateRouteAnimationAction,
  setRoutesToRemoveAction,
  setLoadRoutesAction,
  clearRoutesAction,
} = routesSlice.actions;

export default routesSlice.reducer;
