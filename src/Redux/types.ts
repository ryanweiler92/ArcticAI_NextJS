export interface Layer {
  imagerySet: string;
  isActive: boolean;
  isVisible: boolean;
  source: string;
  title: string;
  styleUrl: string;
  type: string;
}

export type LayerToAdd = {
  title: string;
  source: string;
  imagerySet: string;
  type: string;
  styleUrl: string;
};

export type Marker = {
  clientId: string;
  location: string;
  latitude: number;
  longitude: number;
};

export type GptMarker = {
  location: string;
  latitude: number;
  longitude: number;
};

export type UpdatedMarkerName = {
  clientId: string;
  location: string;
};

export type ViewProperties = {
  centerCoords: Array<number>;
  latlonCoords: string;
  resolution: number;
  rotation: number;
  zoom: number;
};

export type SavedMap = {
  id: number;
  name: string;
  description: string;
  markers: Array<Marker>;
  layers: Array<Layer>;
  routes: Array<Route>;
  zoom: number;
  latitude: number;
  longitude: number;
  saveSlot: number;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};

export type Route = {
  id: string;
  routeName: string;
  startLon: number;
  startLat: number;
  endLon: number;
  endLat: number;
  color: string;
  isAnimating: boolean;
  startMarkerId: string;
  endMarkerId: string;
};

export interface RoutesInitialState {
  routes: Array<Route>;
  routeToAdd: Route;
  routeToUpdate: Route;
  closeSimpleRoutesMenu: boolean;
  openColorMenu: boolean;
  colorLoading: boolean;
  routesToRemove: Array<string>;
  loadRoutes: boolean;
}

export interface MarkersInitialState {
  flyToCoordinates: Array<number>;
  loadMarkers: boolean;
  markers: Array<Marker>;
  gptMarkers: Array<Marker>;
  markerToAdd: Marker;
  markerToUpdate: Marker;
}

interface InitialState {
  availableLayers: Array<Layer>;
  layerToAdd: LayerToAdd;
  loadLayers: boolean;
  projection: string;
  savedMaps: Array<SavedMap>;
  selectedMap: SavedMap;
  viewProperties: ViewProperties;
}

export default InitialState;
