import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <div className='container d-flex'>
        <Sidebar />
        <Outlet />
    </div>
  )
}
