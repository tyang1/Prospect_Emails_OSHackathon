import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PanelContent from './PanelContent.jsx';

export default function MainPanel(props) {
  const { images } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
          <PanelContent images={images} />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
