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
  // * setPokemon(e.target.value) triggers the change
  let [pokemon, setPokemon] = useState(window.localStorage.getItem('pokemon') ||'')
  
  let [img, setImg] = useState(null)
  let [abilities, setAbilities] = useState([])

  // useEffect takes in a function and dependency array (where dependency change everytime, function runs)
  useEffect(() => {
    document.title = "This is " + pokemon;
    window.localStorage.setItem('pokemon', pokemon);
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
      if (isCurrent) {
        setImg(res.sprites.front_default)
        setAbilities(res.abilities);
      }
    })
    .catch(() => console.log("stop it"))
    return () => {
      isCurrent = false
    }
  }, [pokemon])
// * setPokemon(e.target.value) triggers the change
  return <div className="App">
  <input id="pokemon" value={pokemon} type="text" onChange={(e) =>setPokemon(e.target.value)} />
  <h1>Stats for {pokemon}</h1>
  <Accordion>
    <AccordionItem>
      <h3>
        <AccordionButton>Sprite</AccordionButton>
      </h3>
      <AccordionPanel>
        {img && <img src={img} alt="Sprite" />}
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <h3>
        <AccordionButton>Abilities</AccordionButton>
      </h3>
      <AccordionPanel>
      {abilities.map(a => {
              return <div>{a?.ability?.name}</div>;
            })}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
</div>

}


export default App;
