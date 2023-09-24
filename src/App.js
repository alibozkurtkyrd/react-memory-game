import { useState, useEffect } from "react";
import "./App.css";
import { Box } from "./Components/Box";
import { Cards } from "./Cards.js";
import { Cards2 } from "./Cards_level2.js";

function App() {
  // shufle the card at the start of the game
  const shuffledCards = Cards.sort((a, b) => 0.5 - Math.random());

  // const [cardsObject, setCardsObject] = useState([...Cards]);
  const [cardsObject, setCardsObject] = useState([...shuffledCards]);

  // this state stores the id of first opened card
  const [firstOpenedCard, setFirstOpenedCard] = useState(-1);

  // create state for controlling the level
  const [level, setLevel] = useState(1);

  // create state for level two grid css
  const [gridCss, setGridCss] = useState(false);

  useEffect(() => {
    checkAllCardOpened();
  }, [firstOpenedCard]);

  // when user click on the card, card will be opened based on condition below
  const openCard = (id) => {
    // This flag will be true when two cards are matched
    let flag = false;
    // this flag will be true when two card are not matched
    let flag2 = false;

    // iterate over the list to find clicked card and then update the properties of
    //isMatched and cssObject will be updated
    const updatedCards = cardsObject.map((card) => {
      // if none of card is not opened yet, open the first clicked card
      if (firstOpenedCard === -1 && card.id === id) {
        // give the id of first opened card to state
        setFirstOpenedCard(id);
        // change the visibility property to be seen by user
        return { ...card, cssObject: { visibility: "visible" } };
      }
      // If there is a previously opened card, find out whether the second
      // clicked card is the match of previously opened card.
      else if (firstOpenedCard !== -1 && card.id === id) {
        if (checkTwoCardIsEqual(firstOpenedCard, id)) {
          // makeTwoCardsDisable(firstOpenedCard);
          // makeTwoCardsDisable(id);
          flag = true;
          return {
            ...card,
            cssObject: { visibility: "visible" },
            isMatched: true,
          };
        }

        // in this condition two card is not matched
        else {
          flag2 = true;
        }
      }

      return card;
    });

    // update the list of card object again
    let modifiedCards = updatedCards;
    // true flag means that 2 cards are mathced and updated the isMatched property
    if (flag) {
      modifiedCards = updatedCards.map((card) => {
        if (card.id === firstOpenedCard) {
          return { ...card, isMatched: true };
        }
        // reset the state
        setFirstOpenedCard(-1);
        // also set false the flag
        flag = false;
        return card;
      });
    }
    // when two cards are not matched, hide the first opened card
    else if (flag === false && flag2 === true) {
      modifiedCards = updatedCards.map((card) => {
        if (card.id === firstOpenedCard) {
          // reset the state
          setFirstOpenedCard(-1);
          return { ...card, cssObject: { visibility: "hidden" } };
        }
        return card;
      });
    }

    // setCardsObject(updatedCards);
    setCardsObject(modifiedCards);
  };

  // detects whether two selected cards are matches
  function checkTwoCardIsEqual(id1, id2) {
    const cardObject1 = cardsObject.find((card) => card.id === id1);
    const cardObject2 = cardsObject.find((card) => card.id === id2);

    if (cardObject1.text + cardObject2.text === 0) return true;

    return false;
  }

  // this function return true when all cards were opened
  function checkAllCardOpened() {
    var count = 0;
    // checkAllCardOpened();
    cardsObject.forEach(function (card) {
      //console.log(message)
      if (card.isMatched == true) {
        count++;
      } else {
        return false;
      }
    });

    // end of the level 2; set gridCss to false in order to remove level2
    // class from App class div
    if (gridCss === true && count == 8) {
      setGridCss(false);
    }

    if (count === cardsObject.length) {
      return true;
    }

    return false;
  }

  function restartGame() {
    const shuffledCards2 = Cards.sort((a, b) => 0.5 - Math.random());

    setGridCss(false);
    setCardsObject(shuffledCards2);
    setLevel(1);
  }

  function goNextLevel() {
    setLevel(2);

    // shuffle the cards
    const shuffledCards2 = Cards2.sort((a, b) => 0.5 - Math.random());

    // set the shuffled cards
    setCardsObject(shuffledCards2);

    // this state will control the add the css class of "level2"
    setGridCss(true);
  }
  function createCard(cardItem) {
    // this variable help me to add "opened class"
    const isHidden = firstOpenedCard === cardItem.id;

    return !cardItem.isMatched2 ? (
      <Box
        key={cardItem.id}
        style={cardItem.cssObject}
        imgPath={cardItem.imgPath}
        changeCss={() => openCard(cardItem.id)}
        opened={isHidden}
      />
    ) : null;
  }

  return (
    // <div className="App">
    <div className={`App ${gridCss ? "level2" : ""}`}>
      {checkAllCardOpened() ? (
        <div>
          <div className="congratulations">Congratulations!</div>
          <button className="btn-cta" onClick={restartGame}>
            Restart Game
          </button>
          {level == 1 ? (
            <button className="btn-cta" onClick={goNextLevel}>
              Next Level
            </button>
          ) : null}
        </div>
      ) : (
        cardsObject.map(createCard)
      )}
    </div>
  );
}

export default App;
