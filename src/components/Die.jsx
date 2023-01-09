import React from 'react'

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  }

  return (
    <div onClick={props.holdDie} style={styles} className="die">
      <span>{props.value}</span>
    </div>
  )
}

export default Die
