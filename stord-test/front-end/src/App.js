import './App.css';
import { useState } from 'react';
import { isValidUrl } from './utils/urlValidator';
import { generateShortenUrl } from './api';

function App() {
  const [url, setUrl] = useState();
  const [error, setError] = useState();
  const [shortenUrl, setShortenUrl] = useState();

  const clear = () => {
    setError('');
    setShortenUrl('');
  }

  const onChange = (e) => {
    clear();
    setUrl(e.target.value);
  }
  
  const submitUrl = () => {
    clear();
    if(isValidUrl(url)) {
      generateShortenUrl(url).then((shortenUrl) => {
        setShortenUrl(shortenUrl);
      }).catch(() => {
        setError('Something went wrong');
      })
    } else {
      setError('Url is not valid');
    }
  }

  return (
    <div className="App">
      <input name="url" value={url} onChange={onChange} placeholder="Enter url to be shorten" />
      {error && <p className='error'>{error}</p>}
      {shortenUrl && <p>Generated url: {shortenUrl}</p>}
      <button type='button' onClick={submitUrl}>Generate short url</button>
    </div>
  );
}

export default App;
