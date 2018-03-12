import { PLACE_STATUS } from '../Actions/PlaceActions';
import { USER_STATUS } from '../Actions/UserActions';

export default function (state = {}, action) {
  switch (action.type) {
    case PLACE_STATUS:
      return { ...state, places: action.payload };
    case USER_STATUS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
