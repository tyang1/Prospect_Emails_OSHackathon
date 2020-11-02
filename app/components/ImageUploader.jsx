import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { withStyles } from '@material-ui/core/styles';
//ImageUpload Icon Colors:
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import cx from 'classnames';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  input: {
    display: 'none',
  },
  selectedButton: {
    color: pink[900],
    margin: 10,
  },
  defaultButton: {
    color: blue[900],
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: 'default',
  },
});

export function ImageUpload(props) {
  const { onFileSelect, classes, fileName, id } = props;
  const [isSelected, setSelected] = useState(false);
  const handleFileInput = (e) => {
    // handle validations
    if (e.target.files[0]) {
      setSelected(true);
    } else {
      setSelected(false);
    }
    onFileSelect({ name: fileName, content: e.target.files[0] });
  };
  return (
    <div>
      <input
        onChange={handleFileInput}
        className={classes.input}
        id={id}
        type='file'
        accept='image/*'
        name={fileName}
      />
      <label htmlFor={id}>
        <Fab
          component='span'
          className={cx({
            [classes.defaultButton]: !isSelected,
            [classes.selectedButton]: isSelected,
          })}
        >
          <AddPhotoAlternateIcon />
        </Fab>
      </label>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(ImageUpload);
