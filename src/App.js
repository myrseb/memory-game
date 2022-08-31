import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/beagle.jpg", matched: false},
  {"src": "/img/cat.jpg", matched: false},
  {"src": "/img/dog.jpg", matched: false},
  {"src": "/img/falcon.jpg", matched: false},
  {"src": "/img/horse.jpg", matched: false},
  {"src": "/img/sheep.jpg", matched: false},
  {"src": "/img/alpaca.jpg", matched: false},
  {"src": "/img/ara.jpg", matched: false},
  {"src": "/img/giraffe.jpg", matched: false},
  {"src": "/img/lampart.jpg", matched: false},
  {"src": "/img/lion.jpg", matched: false},
  {"src": "/img/monkey.jpg", matched: false}
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [bestResult, setBestResult] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)

  const duplicateAndShuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, "id" : Math.random() }))
    
    setFirstChoice(null)
    setSecondChoice(null)  
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  //compare choices and set matched property
  useEffect(() => {
    if (firstChoice && secondChoice) {

      if (firstChoice.src === secondChoice.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 800)
      }

    }

  }, [firstChoice, secondChoice])

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns =>  prevTurns + 1)
  }

  const updateBestResult = () => {
    bestResult > turns || bestResult === 0 ? setBestResult(turns) : setBestResult(bestResult)
  }

  

  //start the game
  useEffect(() => duplicateAndShuffleCards(), [])


  //end game and save best result

  useEffect(() => {
    if (cards.every((card => card.matched))) {
      updateBestResult()
    }
  }, [cards])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={duplicateAndShuffleCards}>NEW GAME</button>
      <div className="cards-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={ card === firstChoice || card === secondChoice || card.matched }
          />
        )
        )}
      </div>
      <p>Turns: {turns}</p>
      {bestResult ? <p>Your best today: {bestResult}</p> : null}
    </div>
  );
}

export default App;
