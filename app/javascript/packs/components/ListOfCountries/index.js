import React from 'react'

class ListOfCountries extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Bandeira</th>
                <th scope='col'>País</th>
                <th scope='col'>Sigla</th>
                <th scope='col'>Moeda</th>
                <th scope='col'>Blocos Econômicos</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    )
  }
}
export default ListOfCountries
