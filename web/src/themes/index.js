import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const themes = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  palette: {
    primary: {
      main: 'rgb(46,156,219)',
    },
  },
  typography: {
    fontFamily: ['PromptRegular'].join(','),
  },
});

export default themes;
