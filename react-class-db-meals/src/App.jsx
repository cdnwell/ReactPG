import { useState } from 'react'
import './App.css'
import Background from './components/Background/Background'
import TourProvider from './components/store/TourProvider'
import Header from './components/Template/Header'
import Section from './components/Template/Section'

function App() {

  return (
    <TourProvider>
      <Background />
      <Header />
      <Section />
    </TourProvider>
  )
}

export default App
