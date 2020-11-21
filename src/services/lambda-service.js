const LAMBDA_URL = 'https://8odnccq66m.execute-api.us-east-1.amazonaws.com/dev/index';

export const getDownloadUrl = async id => {
  const response = await fetch(`${LAMBDA_URL}?id=${id}`);
  return await response.json();
}

export const getPhotos = async ({ page, perPage, query }) => {
  const response = await fetch(`${LAMBDA_URL}?page=${page}&per_page=${perPage}&query=${query}&order_by=latest&orientation=portrait&sig=${Math.round(Math.random() * 10000)}`);
  return await response.json();
}

export const getCollectionList = async ({ page, perPage, query }) => {
  const response = await fetch(`${LAMBDA_URL}?page=${page}&per_page=${perPage}&collection_query=${query}`);
  return await response.json();
}

export const getCollectionPhotos = async ({ page, perPage, id }) => {
  const response = await fetch(`${LAMBDA_URL}?page=${page}&per_page=${perPage}&collection_id=${id}`);
  return await response.json();
}

export const getCollectionInfo = async ({ id }) => {
  const response = await fetch(`${LAMBDA_URL}?collection_info=${id}`);
  return await response.json();
}

export const getUserCollections = async ({ page, perPage, userName }) => {
  const response = await fetch(`${LAMBDA_URL}?page=${page}&per_page=${perPage}&user_name=${userName}`);
  return await response.json();
}
