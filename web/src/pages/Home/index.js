import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grow,
  Paper,
  Popper,
  CardMedia,
  TextField,
  Container,
  ButtonBase,
  Typography,
  IconButton,
  CircularProgress,
  ClickAwayListener,
} from '@material-ui/core';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import { useDispatch, useSelector } from 'react-redux';
import {
  getTripListRequest,
  getSuggestionTripRequest,
} from '../../redux/trip/action';
import {
  getTripListSelector,
  getSuggestionTripSelector,
} from '../../redux/trip/selector';

import Loading from '../../components/Loading';

import Trips from './trips';
import Pagination from './pagination';

import useRouter from '../../hooks/useRouter';
import useDebounce from '../../hooks/useDebounce';
// import { ROUTE_PATH } from '../../utils/route-util';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(10, 30),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(7, 20),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 10),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2),
    },
  },
  searchBtn: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.7,
    },
    fontSize: theme.spacing(4),
  },

  // suggestion list style
  popper: {
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  paperSuggestion: {
    maxHeight: 300,
    overflow: 'auto',
  },
  suggestionBtn: {
    padding: theme.spacing(1),
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(0,0,0,0.07)',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  suggestionImg: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let {
    goTo,
    location: { pathname, search: pathQuery },
  } = useRouter();

  const { tripList, metadata, isLoadingTripList } = useSelector(
    getTripListSelector
  );
  const { suggestionTrips, isLoadingSuggestionTrip } = useSelector(
    getSuggestionTripSelector
  );

  const limit = 2; // number of trips display per page
  const [page, setPage] = useState(1); // page number for pagination

  const [searchValue, setSearchValue] = useState(''); // temporary search value
  const debouncedSearch = useDebounce(searchValue, 500); // the real search value will be set after user type 500ms

  const anchorRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false); // check if the search field is focusing
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const prevOpenSuggestion = useRef(openSuggestion);

  // return focus to the search when we transitioned from !openSuggestion -> openSuggestion
  useEffect(() => {
    if (prevOpenSuggestion.current && !openSuggestion)
      anchorRef.current.focus();
    prevOpenSuggestion.current = openSuggestion;
  }, [openSuggestion]);

  useEffect(() => {
    let query = `limit=${limit}`; // query trip list parameter
    if (pathQuery) {
      const urlParams = new URLSearchParams(pathQuery);
      const pageParam = urlParams.get('page');
      const keywordParam = urlParams.get('keyword');

      query += `&page=${page}`;
      if (!!keywordParam) {
        query += `&keyword=${keywordParam}`;
      }
      setPage(pageParam ?? 1);
    }
    // tirgger to fetch trip list
    dispatch(getTripListRequest(query));
  }, [dispatch, page, pathQuery, setPage]);

  useEffect(() => {
    if (debouncedSearch) {
      let query = `keyword=${debouncedSearch}`;
      dispatch(getSuggestionTripRequest(query));
    } 
  }, [debouncedSearch, dispatch]);

  // handle suggestion open when the search field is focused
  useEffect(() => {
    if (searchValue && isFocus && !openSuggestion) setOpenSuggestion(true);
    if (!searchValue && isFocus && openSuggestion) setOpenSuggestion(false);
  }, [isFocus, openSuggestion, searchValue]);

  const handleCloseSuggestion = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setIsFocus(false);
    setOpenSuggestion(false);
  };

  const onClickSearchBox = () => {
    setIsFocus(true);
    if (debouncedSearch) setOpenSuggestion(true);
  };

  const onClickKeyword = (value) => {
    if (value) pathname += `?keyword=${value}`;

    goTo(pathname)();

    setPage(1);
    setIsFocus(false);
    setSearchValue(value);
    setOpenSuggestion(false);
  };

  return (
    <>
      {isLoadingTripList && <Loading />}
      <Container disableGutters className={classes.container}>
        <Box textAlign="center">
          <Typography color="primary" variant="h2">
            เที่ยวไหนดี
          </Typography>
        </Box>

        <Box
          my={4}
          width={1}
          display="flex"
          alignItems="center"
          flexDirection="row"
        >
          <Box width={1} position="relative">
            <Box onClick={onClickSearchBox}>
              <TextField
                fullWidth
                value={searchValue}
                variant="outlined"
                placeholder="หาที่เที่ยวแล้วไปกัน..."
                inputProps={{
                  style: {
                    textAlign: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                }}
                onChange={(event) => setSearchValue(event.target.value)}
                ref={anchorRef}
              />
            </Box>

            {/* display sggestion searching result */}
            <Popper
              open={openSuggestion}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              className={classes.popper}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper className={classes.paperSuggestion}>
                    <ClickAwayListener onClickAway={handleCloseSuggestion}>
                      <Box>
                        {isLoadingSuggestionTrip ? (
                          <Box textAlign="center" p={1}>
                            <CircularProgress color="primary" size={30} />
                          </Box>
                        ) : suggestionTrips.length <= 0 ? (
                          <ButtonBase
                            className={classes.suggestionBtn}
                            onClick={() => onClickKeyword(searchValue)}
                          >
                            <Typography variant="body1">
                              {searchValue}
                            </Typography>
                          </ButtonBase>
                        ) : (
                          suggestionTrips.map((suggest, idx) => {
                            return (
                              <ButtonBase
                                className={classes.suggestionBtn}
                                onClick={() => onClickKeyword(suggest.title)}
                                key={idx}
                              >
                                <Box width={0.1}>
                                  <CardMedia
                                    component="img"
                                    image={suggest.photos[0]}
                                    className={classes.suggestionImg}
                                  />
                                </Box>
                                <Box ml={1} width={0.9} textAlign="left">
                                  <Typography
                                    variant="body1"
                                    noWrap
                                    style={{ fontWeight: 700 }}
                                  >
                                    {suggest.title}
                                  </Typography>
                                  <Typography variant="body2" noWrap>
                                    {suggest.description}
                                  </Typography>
                                </Box>
                              </ButtonBase>
                            );
                          })
                        )}
                      </Box>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>

          <IconButton
            className={classes.searchBtn}
            onClick={() => onClickKeyword(searchValue)}
          >
            <SearchRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>

        {/* display trip list */}
        {!isLoadingTripList && tripList.length > 0 && (
          <Trips {...{ tripList, onClickKeyword }} />
        )}

        {/* display not found trip list text */}
        {!isLoadingTripList &&
          tripList.length <= 0 &&
          pathQuery.split('keyword').length > 1 && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2} width={0.5}>
                <CardMedia component="img" image="/icons/not_found.svg" />
              </Box>
              <Typography variant="h6">
                ขออภัยครับ ไม่พบสถานที่ที่คุณกำลังหา
              </Typography>
            </Box>
          )}

        {/* trip list pagination */}
        {metadata && tripList.length > 0 && (
          <Pagination
            {...{
              totalPage: metadata.totalPage,
              page,
              setPage,
              setSearchValue,
            }}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
