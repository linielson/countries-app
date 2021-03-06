import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash'
import ModalCountry from '../ModalCountry'

class Country extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
    }
  }

  setModalShow(show) {
    this.setState({ modalShow: show })
  }

  render() {
    const { item } = this.props

    if (isEmpty(item)) {
      return null
    }

    return (
      <>
        <tr>
          <td>
            <img
              className='img-flag img-fluid float-left'
              src={item.flag}
              alt={`${item.name} flag`}
            />
          </td>
          <td>{ item.name }</td>
          <td>{ item.acronym }</td>
          <td>
            {item.currencies.map(currency => (
              <div key={currency.code}>{ currency.code }</div>
            ))}
          </td>
          <td>
            {item.regional_blocs.map(bloc => (
              <div key={bloc.acronym}>{ bloc.acronym }</div>
            ))}
          </td>
          <td className='text-right'>
            <button
              type='button'
              className='btn btn-default'
              onClick={() => this.setModalShow(true)}
            >
              <span title='Mais informações'><FontAwesomeIcon icon={faEye} /></span>
            </button>
          </td>
        </tr>

        <ModalCountry
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          country={ item }
        />
      </>
    )
  }
}

export default Country

Country.propTypes = {
  item: PropTypes.object.isRequired,
}
