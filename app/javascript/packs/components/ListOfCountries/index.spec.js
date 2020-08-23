import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListOfCountries from './'

describe('<ListOfCountry />', () => {
  let subject

  function compile() {
    subject = render(
      <ListOfCountries>{ <tr><td>Rendered child component</td></tr> }</ListOfCountries>
    )
    return subject
  }

  it('renders the table', () => {
    compile()
    expect(subject.container.querySelector('table')).toBeInTheDocument()
    expect(subject.queryByText('Bandeira')).toBeVisible()
    expect(subject.queryByText('País')).toBeVisible()
    expect(subject.queryByText('Sigla')).toBeVisible()
    expect(subject.queryByText('Moeda')).toBeVisible()
    expect(subject.queryByText('Blocos Econômicos')).toBeVisible()
  })

  it('renders the children component', () => {
    compile()
    expect(subject.queryByText('Rendered child component')).toBeVisible()
  })
})
