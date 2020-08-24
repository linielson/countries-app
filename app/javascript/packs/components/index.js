import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('country-app')
  app && ReactDOM.render(<App />, app)
})
