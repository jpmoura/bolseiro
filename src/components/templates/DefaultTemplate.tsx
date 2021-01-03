import {
  Container, createMuiTheme, StylesProvider, ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import ApplicationBar from '../organisms/ApplicationBar';
import Footer from '../organisms/Footer';

interface DefaultInterfaceProps {
  children?: React.ReactNode
}

function DefaultTemplate({ children }: DefaultInterfaceProps): JSX.Element {
  const theme = createMuiTheme();

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container>
          <ApplicationBar />
          {children}
          <Footer />
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
}

DefaultTemplate.defaultProps = {
  children: null,
};

export default DefaultTemplate;
