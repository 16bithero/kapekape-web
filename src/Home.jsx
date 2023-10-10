import React from 'react'

export default function Home() {

  const name = localStorage.getItem('name');

  return (
    <div className='custom-body'>
      <div className='custom-container'>
        <h1>Hello, {name? name: "bestie"}!</h1>
      </div>
    </div>
  )
}