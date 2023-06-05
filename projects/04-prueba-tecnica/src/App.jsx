import { useState, useEffect } from "react";
import "./App.css";
import { getRandomFact } from "./services/fact";
import { useCatImage } from "./hooks/useCatImage";

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`




function App() {




  const [fact, setFact] = useState();
  const {image} = useCatImage({fact});
  useEffect(() => {
    getRandomFact().then(setFact)
    
    /*  FETCH CON ASYNC Y AWAIT  */
    // async function getRandonFact () {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //   const json = await res.json()
    //   setFact(json.fact)
    // }

    // getRandonFact()
  }, []);

  
  
  const handleClick = async() => {
    const data = await getRandomFact()
    setFact(data)
  }
  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {image && (
        <img
          src={image}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
