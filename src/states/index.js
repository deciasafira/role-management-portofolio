import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './roles/Reducer';
import servicesReducer from './services/Reducer';
import worksetsReducer from './/worksets/Reducer'
import globalReducer from './global/reducer';

const store = configureStore({
  reducer: {
    roles: rolesReducer,
    services: servicesReducer,
    worksets: worksetsReducer,
    globalState: globalReducer
  },
});

export default store;