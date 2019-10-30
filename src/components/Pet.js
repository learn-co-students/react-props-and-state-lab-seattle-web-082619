import React from 'react'
import { Agent } from 'http'

class Pet extends React.Component {
  handleAdoptPet = () => {
    this.props.onAdoptPet(this.props.pet.id)
    console.log(`You are adopting ${this.props.pet.name}!`)
  }

  render() {
    
    let {age, gender, id, isAdopted, name, type, weight} = this.props.pet
    
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {gender === 'female' ? '♀' : '♂'}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          {isAdopted ? 
          (<button className="ui disabled button">Already adopted</button>)
          : (
          <button onClick={this.handleAdoptPet} className="ui primary button">Adopt pet</button>)
          }
        </div>
      </div>
    )
  }
}

export default Pet
