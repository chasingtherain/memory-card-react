import { useEffect, useState } from 'react'
import Card from './components/Card'
import './App.css'

const cardImages = [
  {"src": "/img/scroll-1.png", "category": 1},
  {"src": "/img/helmet-1.png", "category": 2},
  {"src": "/img/potion-1.png", "category": 3},
  {"src": "/img/ring-1.png", "category": 4},
  {"src": "/img/shield-1.png", "category": 5},
  {"src": "/img/sword-1.png", "category": 6}
]
function App() {
  const [cards, setCards] = useState([])
  const [prevCard, setPrevCard] = useState("")
  const [currentCard, setCurrentCard] = useState("")
  const [flippedCardCount, setFlippedCardCount] = useState(0)


  useEffect(()=>{
    if(prevCard === currentCard){
      console.log(prevCard,currentCard,cards);
      const unaffectedArray = cards.filter(card => card.category !== +prevCard)
      const matchedId = cards.filter(card => card.category === +prevCard)
      matchedId.forEach((card)=> card.matched = true)
      console.log(matchedId);
      setCards(unaffectedArray.concat(matchedId))
      console.log(cards);
    } 
  },[prevCard,currentCard])

  const shuffleCards = () => {
    const shuffledCard = [...cardImages,...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random(), matched: false}))
      // console.log(shuffledCard);
      setCards(shuffledCard)
  }

  // const compareSelection

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
            setCurrentCard={setCurrentCard}
            prevCard={prevCard}
            setPrevCard={setPrevCard}
            flippedCardCount = {flippedCardCount}
            setFlippedCardCount = {setFlippedCardCount}
          />
        )}
      </div>
    </div>
  );
}

export default App