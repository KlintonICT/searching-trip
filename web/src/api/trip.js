import HttpUtil from '../utils/http-util';
import { ROUTE_API } from '../utils/route-util';

const trip = {
  getTripList: async (data) =>
    await HttpUtil.get(`${ROUTE_API.tripList}?${data}`),

  suggestionTrip: async (data) =>
    await HttpUtil.get(`${ROUTE_API.suggestionTrip}?${data}`),
};

export default trip;
