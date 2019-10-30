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

  fetchPets = () => {
    fetch(this.state.filters.type === 'all'?'/api/pets':`/api/pets?type=${this.state.filters.type}`)
    .then(rawPets => rawPets.json())
    .then(pets => {
      console.log("fetched/filtered pets")
      this.setState({
        pets: pets
      })
    })
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    }, () => {console.log(this.state.filters)})
  }

  onAdoptPet = (petId) => {
    console.log("adopt fire")
    const newPets = this.state.pets.map((pet) => {
      if (pet.id === petId) {
        pet.isAdopted = true;
      }
      return pet
    })
    console.log(newPets)
    this.setState({
      pets: newPets
    })
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
              <Filters 
                onChangeType={this.onChangeType} 
                onFindPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App