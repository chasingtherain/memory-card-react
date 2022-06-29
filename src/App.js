import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'

const cardImages = [
  {"src": "/img/scroll-1.png"},
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]
function App() {
  const [cards, setCards] = useState([])
  const [prevCard, setPrevCard] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // setting card choice
  const handleChoice = (card) => {
      (currentCard) ? setPrevCard(card) : setCurrentCard(card)      
  }

  // update matched status if there is a match
  const updateMatchedStatus = () => {
    setCards((prevState) => prevState.map(card => {
      if (card.src === prevCard.src) {
        return {...card, matched: true}
      }
      return card
    }))
  }

  // compare between two cards
  useEffect(()=>{
    if(prevCard && currentCard){
      setDisabled(true)
      if(prevCard.src === currentCard.src){
        console.log("cards matched", cards);
        updateMatchedStatus()
        resetTurn()
      } 
      else{
        console.log("cards do not match");
      setTimeout(() => {
        resetTurn()
      },1200)
      }
    }
  },[prevCard,currentCard])


  const resetTurn = () => {
    setPrevCard(null)
    setCurrentCard(null)
    setDisabled(false)
  }

  const shuffleCards = () => {
    const shuffledCard = [...cardImages,...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random(), matched: false}))
      // console.log(shuffledCard);
      setCards(shuffledCard)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards && cards.map((card) => 
          <Card 
            key = {card.id}
            card = {card}
            currentCard={currentCard}
            prevCard={prevCard}
            handleChoice = {handleChoice}
            flipped = {card === prevCard || card === currentCard || card.matched}
            disabled = {disabled}
          />
        )}
      </div>
    </div>
  );
}

export default App