import { FETCH_PLACES, GET_DOWNLOAD_URL } from '../Actions/PlaceActions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return action.payload;
    case GET_DOWNLOAD_URL:
      return Object.assign({}, state, {
        [action.payload.placeId]: Object.assign({}, state[action.payload.placeId], {
          downloadUrl: action.payload.downloadUrl
        })
      });
    default:
      return state;
  }
}
