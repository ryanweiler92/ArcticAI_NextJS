import mapReducer from './slices/mapSlice';
import routesReducer from '@redux/slices/routesSlice';
import markersReducer from '@redux/slices/markersSlice';
import userSlice from '@redux/slices/userSlice';

const rootReducer = () => {
  return {
    map: mapReducer,
    routes: routesReducer,
    markers: markersReducer,
    user: userSlice,
  };
};

export default rootReducer;
