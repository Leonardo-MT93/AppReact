import { useState, useEffect } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

function App() {
  const [fact, setFact] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
    /*  FETCH CON ASYNC Y AWAIT  */
    // async function getRandonFact () {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //   const json = await res.json()
    //   setFact(json.fact)
    // }

    // getRandonFact()
  }, []);

  useEffect(() => {
      if(!fact) return
        //const firstWord = fact.split(' ').slice(0,3).join(' '); //Agarra las 3 primeras palabras
        const firstWord = fact.split(" ", 3).join(" "); //Hace lo mismo peros implificado
        fetch(
          `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            const { url } = response;
            setImage(`${url}`);
          });
  }, [fact])
  

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {image && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${image}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
