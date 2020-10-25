import React, { useContext } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AppContext } from './Provider';
import { download } from '../services/download-service';

const ImageGrid = ({ query }) => {
  const { state, fetchMore } = useContext(AppContext);

  if (state.photoItems.length === 0) {
    const { page, perPage } = state;
    fetchMore({ page: page + 1, perPage, query });
  }

  return (
    <div style={{
      columns: '6 200px',
      columnGap: '1rem'
    }}>
      {state.photoItems.map(({ id, created, description, altDescription, urls, links, likes, user }) => (
        <div key={id}>
          <a href={links.download} onClick={async e => await download(e, id)}>
            <Image src={urls.thumb} alt={description || altDescription || 'No description'} thumbnail />
          </a>
        </div>
      ))}
    </div>

  );
}

export default ImageGrid;
