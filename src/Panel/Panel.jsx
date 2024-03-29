import React, {useState} from 'react'
import "./Style/Admin.css"
import Accueil from './Accueil'
import Header from './Header'
import SideBar from './SideBar'

function Panel() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Accueil />
    </div>
  )
}

export default Panel
