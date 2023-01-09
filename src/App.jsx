import Die from './components/Die'
import './App.css'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [diceRoll, setDiceRoll] = useState(0)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won!')
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const diceArr = []

    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDie())
    }

    return diceArr
  }

  const rollDice = () => {
    if (!tenzies) {
      setDiceRoll((prevVal) => prevVal + 1)
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const holdDie = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const dieElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ))

  return (
    <>
      <main>
        {tenzies && <Confetti />}
        {tenzies && (
          <div className="game__container">
            <h1>Congrats!</h1>
            <p>Rolls count: {diceRoll}</p>
            <button className="roll-dice" onClick={rollDice}>
              New Game
            </button>
          </div>
        )}
        {!tenzies && (
          <div className="game__container">
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className="die__container">{dieElement}</div>
            <button className="roll-dice" onClick={rollDice}>
              Roll
            </button>
          </div>
        )}
      </main>
      <footer>
        <span>© George Albu {new Date().getFullYear()}</span>
        <div className="socials">
          <a className="icons" href="https://github.com/AlbuGeorge">
            <IoLogoGithub style={{ color: 'white' }} size={23} />
          </a>
          <a className="icons" href="https://www.linkedin.com/in/georgealbu24/">
            <IoLogoLinkedin style={{ color: 'white' }} size={23} />
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
