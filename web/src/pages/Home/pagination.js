import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';

import useRouter from '../../hooks/useRouter';

const useStyles = makeStyles((_theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'grey',
  },
}));

const Pagination = ({ totalPage, page, setPage, setSearchValue }) => {
  const classes = useStyles();
  let {
    goTo,
    location: { pathname, search: pathQuery },
  } = useRouter();

  const isLeft = () => page > 1; // check if prev button available
  const isRight = () => page < totalPage; // check if right button available

  // return new pathname
  const pathnameQuery = (pageNumber) => {
    pathname += `?page=${pageNumber}`;
    const urlParams = new URLSearchParams(pathQuery);
    const keyword = urlParams.get('keyword');
    if (keyword) {
      setSearchValue(keyword);
      pathname += `&keyword=${keyword}`;
    }

    return pathname;
  };

  const onNextPage = () => {
    goTo(pathnameQuery(parseInt(page) + 1))();
  };

  const onPrevPage = () => {
    let path = pathname;
    if (parseInt(page) === 2) setPage(1);
    else path = pathnameQuery(parseInt(page) - 1);

    goTo(path)();
  };

  return (
    <>
      <Box className={classes.container}>
        <ButtonBase disabled={!isLeft()} onClick={onPrevPage}>
          <Typography variant="body1" color={isLeft() ? 'primary' : 'inherit'}>
            {'< ย้อนกลับ'}
          </Typography>
        </ButtonBase>
        <ButtonBase disabled={!isRight()} onClick={onNextPage}>
          <Typography variant="body1" color={isRight() ? 'primary' : 'inherit'}>
            {'ถัดไป >'}
          </Typography>
        </ButtonBase>
      </Box>
    </>
  );
};

export default Pagination;
