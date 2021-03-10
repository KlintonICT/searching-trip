import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Link,
  Paper,
  Hidden,
  CardMedia,
  Typography,
  ButtonBase,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: 'grey',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
    },
  },
  cardMedia: {
    borderRadius: theme.spacing(1.5),
    height: '100%',
    minHeight: 300,
    [theme.breakpoints.down('xs')]: {
      borderRadius: theme.spacing(0.5, 0.5, 0, 0),
    },
  },
  link: {
    color: '#000',
  },
  twoLineDisplay: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  textUnderline: {
    textDecoration: 'underline',
    zIndex: 1,
  },
  photoList: {
    height: 100,
    width: 100,
    [theme.breakpoints.down('sm')]: {
      height: 80,
      width: 80,
    },
    [theme.breakpoints.down('xs')]: {
      height: 60,
      width: 60,
    },
    borderRadius: theme.spacing(1.5),
  },
}));

const Trips = memo(({ tripList, onClickKeyword }) => {
  const classes = useStyles();

  const bigImg = (image) => (
    <CardMedia component="img" image={image} className={classes.cardMedia} />
  );

  const displayPhotoList = (trip) => {
    let photos = [];
    // looping only 3 remaining photos (except the first one)
    const photoLength = trip.photos.length - 1 > 3 ? 3 : trip.photos.length - 1;

    for (let i = 1; i <= photoLength; i++) {
      photos.push(
        <Box mr={2} key={i}>
          <CardMedia
            component="img"
            image={trip.photos[i]}
            className={classes.photoList}
          />
        </Box>
      );
    }

    return photos;
  };

  const displayTripDetail = (trip) => {
    return (
      <Box display="flex" flexDirection="column" height={1}>
        {/* display trip title */}
        <Link
          href={trip.url}
          target="_blank"
          rel="noreferrer"
          underline="none"
          className={classes.link}
        >
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            style={{ fontWeight: 700 }}
            className={classes.twoLineDisplay}
          >
            {trip.title}
          </Typography>
        </Link>
        {/* display first trip description */}
        <Typography
          variant="body1"
          paragraph
          className={classes.twoLineDisplay}
        >
          {trip.description.split('\n\n')[0]}
        </Typography>
        {/* display second trip description */}
        <Box
          width={0.7}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {trip.description.split('\n\n').length > 1 && (
            <Box width={0.8}>
              <Typography variant="body1" noWrap>
                {trip.description.split('\n\n')[1]}
              </Typography>
            </Box>
          )}
          <Link
            href={trip.url}
            target="_blank"
            rel="noreferrer"
            underline="none"
            className={classes.textUnderline}
          >
            <Typography variant="body1" color="primary" noWrap>
              อ่านต่อ
            </Typography>
          </Link>
        </Box>
        {/* display tags list */}
        <Grid container>
          <Typography variant="caption">หมวด - </Typography>
          <Box mr={1} />
          {trip.tags.map((tag, idx) => {
            return (
              <Box
                key={idx}
                mr={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                {idx === trip.tags.length - 1 && trip.tags.length > 1 && (
                  <Box mr={1}>
                    <Typography variant="caption">และ </Typography>
                  </Box>
                )}
                <ButtonBase onClick={() => onClickKeyword(tag)}>
                  <Typography
                    variant="caption"
                    className={classes.textUnderline}
                  >
                    {tag}
                  </Typography>
                </ButtonBase>
              </Box>
            );
          })}
        </Grid>
        {/* display photo list */}
        <Box flexGrow={1} />
        <Box display="flex" flexDirection="row" alignItems="center" mt={1}>
          {displayPhotoList(trip)}
        </Box>
      </Box>
    );
  };

  return (
    <>
      {tripList.map((trip, key) => {
        return (
          <Paper className={classes.paperContainer} key={key}>
            {/* ********** Display when the page is in desktop screen  *********** */}
            <Hidden xsDown>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/* display big image */}
                  {bigImg(trip.photos[0])}
                </Grid>

                <Grid item xs={8}>
                  {displayTripDetail(trip)}
                </Grid>
              </Grid>
            </Hidden>

            {/* ********** Display when the page is in mobile screen  *********** */}
            <Hidden smUp>
              {/* display big image */}
              {bigImg(trip.photos[0])}
              <Box p={2}>{displayTripDetail(trip)}</Box>
            </Hidden>
          </Paper>
        );
      })}
    </>
  );
});

export default Trips;
