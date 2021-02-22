import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MediaQuery from 'react-responsive';

export default function MyForm(props) {
  const { icon } = props;
  const [sliderState, setSliderState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSliderState({ ...sliderState, [anchor]: open });
  };
  let anchor = 'right';
  return (
    <>
      <MediaQuery query='(max-device-width: 1224px)'>
        <Button onClick={toggleDrawer(anchor, true)}>{icon}</Button>
        <Drawer
          anchor={anchor}
          open={sliderState[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {props.children}
        </Drawer>
      </MediaQuery>
      <MediaQuery query='(min-device-width: 1224px)'>
        {props.children}
      </MediaQuery>
    </>
  );
}
