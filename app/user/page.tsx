'use client'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      const response = await axios.get('https://bookmanagement-nine.vercel.app/api/vender')
      console.log('Response data:', response.data)
      setData(response.data)
    } catch (error) {
      console.error('Full error:', error)

    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black">
      <div className='flex gap-2'>
        <h1 className='flex gap-2 p-2 bg-gray-800 text-white'>hello usess</h1>
        <button className='p-2 bg-gray-800 text-white rounded-xl' onClick={getData}>Get Data</button>

      </div>
      <div className='rounded-xl shadow-lg p-2'>
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
