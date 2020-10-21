import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PanelContent from './PanelContent.jsx';
import { withStyles } from '@material-ui/core';

const StyledTypography = withStyles({
  root: {
    backgroundColor: '#cfe8fc',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Typography);

export default function MainPanel(props) {
  const { images } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <StyledTypography>
          <PanelContent images={images} />
        </StyledTypography>
      </Container>
    </React.Fragment>
  );
}
