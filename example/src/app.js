import React from 'react'
import { render } from 'react-dom'
import SmtReact from '../../src'

console.log(SmtReact);

const App = () => <SmtReact />
render(<App />, document.getElementById('root'))