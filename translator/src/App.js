import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './pages/Error';
import Favourites from './pages/Favourites';
import FavouritesId from './pages/FavouritesId';
import Routing from './pages/Routing';
import Translator from './pages/Translator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Routing />} />
        <Route path='translator' element={<Translator />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='favourites/:id' element={<FavouritesId />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
