import React, { useContext } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AppContext } from './Provider';

const ImageGrid = ({ query }) => {
  const { state, fetchMore } = useContext(AppContext);

  if (state.photoItems.length === 0) {
    const { page, perPage } = state;
    fetchMore({ page: page + 1, perPage, query });
  }

  const toDataURL = async url => {
    // TODO create lambda for fetching this without client_id
    const response = await fetch(`${url}?client_id=wA9P_-wGeIauZ3bqxhDOhW5By2tZlAF-oE_qqyxMHDI`);
    const json = await response.json();
    const response2 = await fetch(json.url);
    const blob = await response2.blob();
    return URL.createObjectURL(blob);
  }

  const download = async (e, url, id) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = await toDataURL(url);
    a.download = `${id}.jpg`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  }

  return (
    <div style={{
      columns: '6 200px',
      columnGap: '1rem'
    }}>
      {state.photoItems.map(({ id, created, description, altDescription, urls, links, likes, user }) => (
        <div key={id}>
          <a href={links.download} onClick={async e => await download(e, links.download_location, id)}>
            <Image src={urls.thumb} thumbnail />
          </a>
        </div>
      ))}
    </div>

  );
}

export default ImageGrid;
