import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PanelContent from './PanelContent.jsx';



export default function MainPanel(props){
    const {backgroundColor} = props;
    return(
        <React.Fragment>
        <CssBaseline />
        <Container fixed>
            <Typography style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <PanelContent />
            </Typography>
        </Container>
        </React.Fragment>
    )
}