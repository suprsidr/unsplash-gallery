import { getDownloadUrl } from './lambda-service';

const toDataURL = async id => {
  const json = await getDownloadUrl(id);
  const response2 = await fetch(json.url);
  const blob = await response2.blob();
  return URL.createObjectURL(blob);
}

export const download = async (e, id) => {
  e.preventDefault();
  const a = document.createElement('a');
  a.href = await toDataURL(id);
  a.download = `${id}.jpg`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}