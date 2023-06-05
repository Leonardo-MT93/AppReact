import "./App.css";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`


function App() {
  const { fact, refreshRandomFact } = useCatFact({});
  const { image } = useCatImage({ fact });

  const handleClick = async () => {
    refreshRandomFact();
  };
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
