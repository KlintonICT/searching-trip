import { useHistory, useParams, useLocation } from 'react-router-dom';

const useRouter = () => {
  const history = useHistory();
  const urlParams = useParams();
  const location = useLocation();

  const goTo = (routeName) => () => {
    history.push(routeName);
  };

  return {
    urlParams,
    location,

    goTo,
  };
};

export default useRouter;
