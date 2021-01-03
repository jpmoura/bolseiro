import React from 'react';
import {
  AppBar, Toolbar, makeStyles, IconButton, Grid, Theme,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    bottom: 0,
    top: 'auto',
  },
  offset: theme.mixins.toolbar,
}));

export default function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <div className={classes.offset} />
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <Grid container justify="center">
            <IconButton color="inherit" target="_blank" href="https://www.linkedin.com/in/mourajp/?locale=en_US">
              <FontAwesomeIcon icon={faLinkedin} />
            </IconButton>
            <IconButton color="inherit" target="_blank" href="https://github.com/jpmoura">
              <FontAwesomeIcon icon={faGithub} />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
