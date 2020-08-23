import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Country from './'

describe('<Country />', () => {
  let subject

  function compile(item) {
    subject = render(<Country item={item} />)
    return subject
  }

  describe('when it does not receive the "item"', () => {
    it('does not render the row', () => {
      compile({})
      expect(subject.container.querySelector('tr')).not.toBeInTheDocument()
    })
  })

  describe('when it receives the "item"', () => {
    let country = {
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

    it('renders the country row', () => {
      compile(country)
      expect(subject.container.querySelector('tr')).toBeInTheDocument()
      expect(subject.container.querySelector('tr').querySelectorAll('td')[1]).toHaveTextContent(/^Afghanistan$/)
      expect(subject.container.querySelector('tr').querySelectorAll('td')[2]).toHaveTextContent(/^AFG$/)
      expect(subject.container.querySelector('tr').querySelectorAll('td')[3]).toHaveTextContent(/^AFN$/)
      expect(subject.container.querySelector('tr').querySelectorAll('td')[4]).toHaveTextContent(/^SAARC$/)
    })
  })

  describe('when clicks to show the informations about country', () => {
    let country = {
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

    it('opens the modal', async () => {
      compile(country)
      fireEvent.click(subject.container.querySelector('button'))
      await waitFor(() => {
        expect(subject.queryByText('População')).toBeVisible()
      })
    })
  })
})
