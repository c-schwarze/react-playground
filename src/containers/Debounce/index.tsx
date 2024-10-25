import React, { useState, useEffect } from 'react';

const URL = "https://jsonplaceholder.typicode.com/todos/"

const Debounce = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // Runs whenever the input value changes
  // 1) First, cleanup runs with the old timeoutId, clearing anything that has been run
  // 2) Then, we initiate a new 500ms delay to set the input value
  // 3) Then, if we haven't cleaned it up, we set the DebouncedValue
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (inputValue) {
            // TODO - update to run with real input value
            const url = `${URL}/${inputValue}`;
            callAPI(url)
        }
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const callAPI = async (url: string) => {
    // Option 1
    try {
        const resp = await fetch(url)
        const json = await resp.json()
        setDebouncedValue(json.title);
    } catch (error) {
        // TypeError
        setDebouncedValue(error);
    }

    // Option 2
    // fetch(url).then(
    //     (resp) => {
    //         if (resp.ok) {
    //             return resp.json();
    //         }
    //         throw new Error('ERROR')
    //     }
    // ).then((data) => {
    //     setDebouncedValue(data.title)
    // }).catch((error) => {
    //     setDebouncedValue(error);
    // })
  }

  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default Debounce;