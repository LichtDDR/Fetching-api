import React, { useState, useEffect } from 'react';
import axios from 'axios';
const query = "harry potter";
 
function App() {
  const [data, setData] = useState({ items: [], volumeInfo: "", id: ""});
 
  useEffect(async () => {
    const result = await axios(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    );
 
    setData(result.data);
  });
 
  return (
    <ul>
      {data.items.map(book => (
        <li>
          <a key={book.items}>{book.volumeInfo.title}</a>
          <a key={book.items}>{book.id}</a>
        </li>
      ))}
    </ul>
  );
}
 
export default App;