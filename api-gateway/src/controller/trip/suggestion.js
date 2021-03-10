import axios from 'axios';

/**
 * Get suggestion trips by filter
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */

const suggestion = async (req, res, _next) => {
  try {
    const { keyword } = req.query;

    // create filtering link
    const URL = `${process.env.SERVER_URI}?q=${keyword}`;

    // getting data from json-server (encodeURI: preventing thai language error request)
    const { data } = await axios.get(encodeURI(URL));

    return res.status(200).json({ suggestionTrips: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export default suggestion;
