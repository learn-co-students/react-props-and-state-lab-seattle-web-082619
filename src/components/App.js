import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // newType is a string
  onChangeType = (event) => {
    let newType = event.target.value
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  onFindPetsClick = () => {
    fetch(
      `/api/pets${
        this.state.filters.type === 'all' ? 
        "" 
        : "?type=" + this.state.filters.type
      }`
    )
    .then(res => res.json())
    .then(petJson => {
      this.setState({
        pets: petJson
      })
    })
  }

  onAdoptPet = (id) => {

    this.setState(previousState => {
        return {
          pets: previousState.pets.map( pet => {
          if (pet.id === id) {
            pet.isAdopted = true;
          }
          return pet;
        })
      }
      }
    )
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} isAdopted={this.isAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
