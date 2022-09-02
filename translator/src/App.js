import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navbar />} />
        <Route path='users' element={<Users />} />
        <Route path='about' element={<About />} />
        <Route path='tasks' element={<Tasks />} />
        <Route path='/tasks/:id' element={<TaskIdPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
