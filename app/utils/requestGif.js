const KEY = 'api_key=VwV9rz5sgKf0uBViFwBlU9b8H3lmossH';
const MAX_SIZE = 5 * 10e5;

const GIF_PRIORITIES = ['downsized_large', 'downsized_medium', 'downsized', 'downsized_small'];

const getMDCode = url => `![](${url})`;

export const requestGIF = searchTag => {
  const params = searchTag ? `tag=${searchTag}&${KEY}` : KEY;

  return fetch(`https://api.giphy.com/v1/gifs/random?${params}`)
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
