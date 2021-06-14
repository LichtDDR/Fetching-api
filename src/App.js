import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
 
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
};
function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError}, doFetch] = useDataApi (
    `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    { books: [] },
  )
 
  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`,
          );
 
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
 
      {isError && <div>Something went wrong ...</div>}
 
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.books.map(book => (
            <li>
              <a>{book}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
 
export default App;