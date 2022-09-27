import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './pages/Error';
import Favourites from './pages/Favourites';
import Translator from './pages/Translator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Translator />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
