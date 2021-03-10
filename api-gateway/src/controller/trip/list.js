import axios from 'axios';

/**
 * Get list of trips by filter
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */

const list = async (req, res, _next) => {
  try {
    const { page = 1, limit = 2, keyword = null } = req.query;

    // create filtering link
    let URL = `${process.env.SERVER_URI}?_page=${page}&_limit=${limit}`;
    let URL_FOR_TOTAL_DATA = process.env.SERVER_URI;
    if (!!keyword) {
      URL += `&q=${keyword}`;
      URL_FOR_TOTAL_DATA += `?q=${keyword}`;
    }

    // getting data from json-server (encodeURI: preventing thai language error request)
    const { data } = await axios.get(encodeURI(URL));

    // getting total trips and find total pagination
    const { data: trips } = await axios.get(encodeURI(URL_FOR_TOTAL_DATA));
    const totalPage = Math.ceil(trips.length / limit);

    return res.status(200).json({ tripList: data, metadata: { totalPage } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export default list;
