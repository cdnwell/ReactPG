import { useState } from 'react'
import './App.css'
import Background from './components/template/Background'
import Header from './components/template/Header'
import Section from './components/template/Section'

function App() {

  return (
    <div className="App">
      <Background />
      <Header />
      <Section />
    </div>
  )
}

export default App
