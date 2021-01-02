import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, optionName, theme) {
  return {
    fontWeight:
      optionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  const { options, displayNames, onChange } = props;
  const [optionName, setSelectedName] = React.useState([]);

  const handleChange = (event) => {
    setSelectedName(event.target.value);
    onChange(event);
  };

  return (
    <div>
      <InputLabel id='demo-mutiple-name-label'>Background Color</InputLabel>
      <Select
        labelId='demo-mutiple-name-label'
        id='demo-mutiple-name'
        single
        value={optionName}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {options.map((color, i) => (
          <MenuItem
            key={displayNames[i].name}
            value={displayNames[i].hex}
            style={getStyles(displayNames[i].name, optionName, theme)}
          >
            {color}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
