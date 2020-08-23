import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ModalCountry from './'

describe('<ModalCountry />', () => {
  let subject
  const onHide = jest.fn()
  let country = {
    id: 1,
    name: 'Afghanistan',
    acronym: 'AFG',
    currencies: [{
      code: 'AFN',
      name: 'Afghan afghani',
      symbol: 'A'
    }],
    regional_blocs: [{
      name: 'South Asian Association for Regional Cooperation',
      acronym: 'SAARC'
    }],
    borders: ['CHN'],
    capital: 'Kabul',
    languages: [{name: 'Turkmen', nativeName: 'Türkmen'}],
    population: 999,
    timezones: ['UTC+04:30']
  }

  function compile() {
    subject = render(
      <ModalCountry
        show={true}
        onHide={ onHide }
        country={ country }
      />
    )

    return subject
  }

  it('renders the country name', () => {
    compile()
    expect(subject.queryByText('Afghanistan')).toBeVisible()
  })

  it('renders the country informations', () => {
    compile()
    expect(subject.queryByText('População')).toBeVisible()
    expect(subject.queryByText('999')).toBeVisible()

    expect(subject.queryByText('Timezone')).toBeVisible()
    expect(subject.queryByText('UTC+04:30')).toBeVisible()

    expect(subject.queryByText('Moedas')).toBeVisible()
    expect(subject.queryByText('Afghan afghani')).toBeVisible()

    expect(subject.queryByText('Idiomas')).toBeVisible()
    expect(subject.queryByText('Turkmen')).toBeVisible()

    expect(subject.queryByText('Capital')).toBeVisible()
    expect(subject.queryByText('Kabul')).toBeVisible()

    expect(subject.queryByText('Blocos econômicos')).toBeVisible()
    expect(subject.queryByText('South Asian Association for Regional Cooperation')).toBeVisible()

    expect(subject.queryByText('Fronteiras')).toBeVisible()
    expect(subject.queryByText('CHN')).toBeVisible()
  })

  describe('when clicks at "Fechar"', () => {
    it('closes the modal', () => {
      compile()
      fireEvent.click(subject.getByText(/Fechar/i))
      expect(onHide).toHaveBeenCalledTimes(1)
    })
  })
})
