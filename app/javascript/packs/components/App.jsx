import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import List from './List'
import Item from './Item'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: []
    }

    this.getCountries = this.getCountries.bind(this)
  }

  componentDidMount() {
    this.getCountries()
  }

  getCountries() {
    axios
      .get("/api/countries")
      .then(response => {
        const countries = response.data
        this.setState({ countries })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <List>
        {this.state.countries.map(country => (
          <Item key={country.id} item={country} />
        ))}
      </List>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('country-app')
  app && ReactDOM.render(<App />, app)
})
