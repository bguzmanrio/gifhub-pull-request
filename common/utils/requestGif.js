const URL = 'https://ibc8z5i391.execute-api.us-east-2.amazonaws.com/prod/gifhub';
const MAX_SIZE = 5 * 10e5;

const GIF_PRIORITIES = ['downsized_large', 'downsized_medium', 'downsized', 'downsized_small'];

const getMDCode = url => `![](${url})`;

export const requestGIF = searchTag => {
  const params = searchTag ? `?tag=${searchTag}` : '';

  return fetch(`${URL}${params}`)
    .then(res => res.json())
    .then(response => {
      const selectedGIFName = GIF_PRIORITIES.find(name => {
        const currentGif = response.data.images[name];
        return currentGif.size < MAX_SIZE;
      });

      if (!selectedGIFName) {
        return requestGIF(searchTag);
      }
      
      const selectedGIF = response.data.images[selectedGIFName];

      return {
        gifUrl: selectedGIF.url,
        mdCode: getMDCode(selectedGIF.url)
      };
    })
};

export default {
  requestGIF
};
