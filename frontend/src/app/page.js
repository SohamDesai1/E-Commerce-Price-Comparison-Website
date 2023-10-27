"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("")
    setPrice("")
    setImage("")
    try {
      const response = await axios.post('/api/input', { inputData });
      setName(response.data.name);
      setPrice(response.data.price);
      // setPrice(response.data[1]);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }

  return (
    <>
    <br />
    <br />
    <br /><br />
    <br />
    <br />
    <br />

      <center>
        <div>
          <form onSubmit={handleSubmit}>
            <div class="mb-6">
            <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link to Product:</label>
            <br />
            <input type='url' name='link'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter data" class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="submit">Find</button>
          </form>
          <div>
            {name && <p>Name: {name}</p>}
            {price && <p>Price: {price}</p>}
          </div>
        </div>
      </center>
    </>
  );
}
