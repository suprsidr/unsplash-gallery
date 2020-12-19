const LAMBDA_URL =
  "https://3lxfopan2i.execute-api.us-east-1.amazonaws.com";

export const getDownloadUrl = async (id) => {
  const response = await fetch(`${LAMBDA_URL}/download/${id}`);
  return await response.json();
};

export const getPhotos = async ({ page, query }) => {
  const response = await fetch(
    `${LAMBDA_URL}/search/photos/${query}/${page}`
  );
  return await response.json();
};

export const getCollectionList = async ({ page, query }) => {
  const response = await fetch(
    `${LAMBDA_URL}/search/collections/${query}/${page}`
  );
  return await response.json();
};

export const getCollectionPhotos = async ({ page, id }) => {
  const response = await fetch(
    `${LAMBDA_URL}/collections/${id}/photos/${page}`
  );
  return await response.json();
};

export const getCollectionInfo = async ({ id }) => {
  const response = await fetch(`${LAMBDA_URL}/collections/${id}`);
  return await response.json();
};

export const getUserCollections = async ({ page, userName }) => {
  const response = await fetch(
    `${LAMBDA_URL}/users/${userName}/collections/${page}`
  );
  return await response.json();
};
