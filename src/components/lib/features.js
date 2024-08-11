import moment from 'moment';

const fileFormat = (url = '') => {
  const ext = url.split('.').pop();
  if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') {
    return 'video';
  }
  if (ext === 'mp3' || ext === 'wav') {
    return 'audio';
  }
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
    return 'image';
  }
  return file;
};

// change width
const transformImage = (url = '', width = 100) => {
  const newUrl = url.replace('upload/', `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();
  const laste7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, 'days');
    const dayname = dayDate.format('dddd');
    laste7Days.unshift(dayname);
  }
  return laste7Days;
};

export { fileFormat, transformImage, getLast7Days };
