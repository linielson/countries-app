import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ModalCountry(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          { props.country.name }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">População</th>
              <td>{ props.country.population.toLocaleString('pt-BR') }</td>
            </tr>
            <tr>
              <th scope="row">Timezone</th>
              <td>
                { props.country.timezones.map(timezone => (
                  <div key={timezone}>{ timezone }</div>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Moedas</th>
              <td>
                { props.country.currencies.map(currency => (
                  <div key={currency.code}>{ currency.name }</div>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Idiomas</th>
              <td>
                { props.country.languages.map(language => (
                  <div key={language.name}>{ language.name }</div>
                )) }
              </td>
            </tr>
            <tr>
              <th scope="row">Capital</th>
              <td>{ props.country.capital }</td>
            </tr>
            <tr>
              <th scope="row">Blocos econômicos</th>
              <td>
                { props.country.regional_blocs.map(regional_bloc => (
                  <div key={regional_bloc.acronym}>{ regional_bloc.name }</div>
                )) }
              </td>
            </tr>
            <tr>
              <th scope="row">Fronteiras</th>
              <td>
                { props.country.borders.map(border => (
                  <div key={border}>{ border }</div>
                )) }
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCountry
