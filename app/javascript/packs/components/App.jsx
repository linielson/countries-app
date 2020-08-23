import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import List from './List'
import Item from './Item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      filter: null
    }

    this.getCountries = this.getCountries.bind(this)
  }

  componentDidMount() {
    this.getCountries()
  }

  handleChange(e) {
    this.setState({ filter: e.target.value })
  }

  handleClick() {
    this.getCountries(this.state.filter)
  }

  getCountries(filter = null) {
    let filter_params = {}

    if (filter) {
      filter_params = {
        params: { filter: filter }
      }
    }

    axios
      .get('/api/countries', filter_params)
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
      <>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Nome do país, sigla ou moeda...'
            onChange={ (e) => this.handleChange(e) }
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={ () => this.handleClick() }
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <List>
          {this.state.countries.map(country => (
            <Item key={country.id} item={country} />
          ))}
        </List>
      </>
    )
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('country-app')
  app && ReactDOM.render(<App />, app)
})
