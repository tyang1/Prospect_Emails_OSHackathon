import React from 'react';

export default function PanelContent(props) {
  const { images } = props;
  console.log('inside PanelContent', images);

  return images ? <img src={images} /> : <div>{images}</div>;
}
