import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import "./styles.css";

function App() {
  let [pokemon, setPokemon] = useState("Pikachu")
  let [img, setImg] = useState(null)

  // useEffect takes in a function and dependency array (where dependency change everytime, function runs)
  useEffect(() => {
    document.title = "saying hello" + pokemon;
  }, [pokemon])

  // 1st) fetch API 
  // 2nd) then get json
  // 3rd) then get the response again
  // 4th) catch the error
  useEffect(()=> {
    let isCurrent = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(res => res.json())
    .then(res => {
      if (isCurrent) setImg(res.sprites.front_default)
    })
    .catch(() => console.log("stop it"))
    return () => {
      isCurrent = false
    }
  }, [pokemon])
  return <div>
  <div className="App">
    <input type="text" onChange={(e) => setPokemon(e.target.value)}/>
  </div> 
  Hello, {pokemon} !

  {img && <img src={img} alt sprite/>}
  </div>

}


export default App;
