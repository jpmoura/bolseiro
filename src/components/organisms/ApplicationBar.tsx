import React from 'react';
import {
  AppBar, Toolbar, Typography, Theme, makeStyles, IconButton,
} from '@material-ui/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  offset: theme.mixins.toolbar,
}));

export default function ApplicationBar(): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton color="inherit">
            <FontAwesomeIcon icon={faPiggyBank} />
          </IconButton>
          <Typography variant="h6">
            Bolseiro
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
}
