import React, { useState } from 'react'

function Card({card, currentCard, prevCard, setCurrentCard, setPrevCard,flippedCardCount, setFlippedCardCount}) {
    const [userFlips, setUserFlips] = useState(false)

    const handleCardFlip = (event) => {
        if(currentCard && !userFlips) setPrevCard(currentCard)
        setCurrentCard(event.target.id);
        console.log(prevCard,currentCard);
        if(flippedCardCount < 2) {
            setUserFlips(true)
            setFlippedCardCount((prevState) => prevState+1)
            setTimeout(() => {
                setUserFlips(false)
                setPrevCard("")
                setCurrentCard("")
                setFlippedCardCount((prevState) => prevState-1)
            },1500)
            // console.log("current count: ", flippedCardCount);
        }
    
    }

    return (
    <div className='card' key={card.id}>
        <div onClick={handleCardFlip} >
            {
                (card.matched) ? <img className='front' src={card.src} id={card.id} alt="card front"/>
                : ((userFlips) ? 
                        <img className='front' src={card.src} alt="card front"/>
                    :   <img className='back' src="/img/cover.png" id={card.category} alt="card back"/>)
            }
        </div>
    </div>
    )
}

export default Card