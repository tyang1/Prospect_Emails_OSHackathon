import React from 'react';

export default function PanelContent(props) {
  const { images } = props;
  return (
    <div
      style={{
        objectFit: 'contain',
        overflow: 'scroll',
      }}
    >
      {images ? <img src={images} /> : null}
    </div>
  );
}
