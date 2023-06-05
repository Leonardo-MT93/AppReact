import { useEffect, useState } from "react";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function useCatImage ({fact}) {
    const [image, setImage] = useState();
      useEffect(() => {
        if(!fact) return
          //const firstWord = fact.split(' ').slice(0,3).join(' '); //Agarra las 3 primeras palabras
          const firstWord = fact.split(" ", 3).join(" "); //Hace lo mismo peros implificado
          fetch(
            `${CAT_PREFIX_IMAGE_URL}/cat/says/${firstWord}?size=50&color=red&json=true`
          )
            .then((res) => res.json())
            .then((response) => {
              const { url } = response;
              setImage(`${CAT_PREFIX_IMAGE_URL}${url}`);
            });
    }, [fact])
    return {image}
  }