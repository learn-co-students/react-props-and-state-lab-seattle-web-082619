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
    
    this.onFindPetsClick();
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let url = '/api/pets';
    if(this.state.filters.type !== 'all')
      url += '?type=' + this.state.filters.type;

    fetch(url)
    .then(resp => resp.json())
    .then(animals => this.setState({ pets: animals }))
  }

  onAdoptPet = (id) => {
    let pet = this.state.pets.find(pet => pet.id === id)
    pet.isAdopted = true;
    this.setState({
      pets: this.state.pets
    });
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
              <Filters onChangeType={ this.onChangeType } onFindPetsClick={ this.onFindPetsClick } />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={ this.state.pets } onAdoptPet= { this.onAdoptPet } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
