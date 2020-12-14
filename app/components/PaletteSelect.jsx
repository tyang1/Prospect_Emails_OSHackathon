import React from 'react';
import MultipleSelect from './MultipleSelect.jsx';
import Box from '@material-ui/core/Box';

const colors = [
  <Box bgcolor='primary.main' color='primary.contrastText' p={2}>
    Blue
  </Box>,
  <Box bgcolor='secondary.main' color='secondary.contrastText' p={2}>
    Pink
  </Box>,
];

const colorNames = ['Blue', 'Pink'];

export default function PaletteSelect(props) {
  const { onChange } = props;
  return (
    <MultipleSelect
      options={colors}
      displayNames={colorNames}
      onChange={onChange}
    />
  );
}
