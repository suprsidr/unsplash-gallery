const LAMBDA_URL = 'https://8odnccq66m.execute-api.us-east-1.amazonaws.com/dev/index';

export const getDownloadUrl = async id => {
  const response = await fetch(`${LAMBDA_URL}?id=${id}`);
  return await response.json();
}

export const getCollection = async ({ page, perPage, query }) => {
  const response = await fetch(`${LAMBDA_URL}?page=${page}&per_page=${perPage}&query=${query}&order_by=latest`);
  return await response.json();
}