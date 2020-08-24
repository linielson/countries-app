import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './'
import fetchMock from 'fetch-mock'

describe('<App />', () => {
  let subject

  function compile() {
    subject = render(<App />)
    return subject
  }

  beforeEach((done) => {
    const countries = [
      {
        id: 1,
        flag: 'https://restcountries.eu/data/afg.svg',
        name: 'Afghanistan',
        acronym: 'AFG',
        currencies: [{
          code: 'AFN',
          name: 'Afghan afghani',
          symbol: 'A'
        }],
        regional_blocs: [{
          name: 'South Asian Association for Regional Cooperation',
          acronym: 'SAARC',
          otherNames: [],
          otherAcronyms: []
        }],
        borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
        capital: 'Kabul',
        languages: [{name: 'Turkmen', iso639_1: 'tk', iso639_2: 'tuk', nativeName: 'Türkmen'}],
        population: 27657145,
        timezones: ['UTC+04:30']
      }
    ]

    fetchMock.getOnce('/api/countries', { countries })

    compile()
    fetchMock.flush(true).then(() => done())
  })

  afterEach(() => {
    subject = undefined
    fetchMock.reset()
  })

  it('renders the countries', async () => {
    await waitFor(() => {
      expect(subject.container.querySelector('table')).toBeInTheDocument()
    })
  })

  it('renders the filter field', async () => {
    await waitFor(() => {
      expect(subject.getByPlaceholderText('Nome do país, sigla ou moeda...')).toBeVisible()
    })
  })
})
