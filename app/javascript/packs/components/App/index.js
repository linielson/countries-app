import React from 'react'
import axios from 'axios'
import ListOfCountries from '../ListOfCountries'
import Country from '../Country'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GithubCorner from 'react-github-corner';

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
        console.log(response.data)
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

        <ListOfCountries>
          {this.state.countries.map(country => (
            <Country key={country.id} item={country} />
          ))}
        </ListOfCountries>

        <GithubCorner href='https://github.com/linielson/countries-app' />
      </>
    )
  }
}

export default App
