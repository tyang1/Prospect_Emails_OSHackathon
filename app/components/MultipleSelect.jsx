import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
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
  //   const classes = useStyles();
  const theme = useTheme();
  const { options, displayNames } = props;
  const [optionName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    //TODO: pass back the displayName matching the selected MenuItem
    setPersonName(event.target.value);
  };

  //   const handleChangeMultiple = (event) => {
  //     const { options } = event.target;
  //     const value = [];
  //     for (let i = 0, l = options.length; i < l; i += 1) {
  //       if (options[i].selected) {
  //         value.push(options[i].value);
  //       }
  //     }
  //     setPersonName(value);
  //   };

  return (
    <div>
      {/* <FormControl className={classes.formControl}> */}
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
        {options.map((name, i) => (
          <MenuItem
            key={displayNames[i]}
            value={displayNames[i]}
            style={getStyles(displayNames[i], optionName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      {/* </FormControl> */}
    </div>
  );
}
