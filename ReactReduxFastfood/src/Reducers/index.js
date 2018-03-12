import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PlaceReducer from './PlaceReducer';
import UserReducer from './UserReducer';
import LoadingReducer from './LoadingReducer';

const rootReducer = combineReducers({
  form: formReducer,
  places: PlaceReducer,
  user: UserReducer,
  loading: LoadingReducer,
});

export default rootReducer;
