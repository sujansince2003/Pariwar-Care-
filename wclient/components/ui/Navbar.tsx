import React from 'react'
import { Button } from './button'
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo"></div>
        <ul>
            <li>
            <Button>
                Login
            </Button></li>
            

        </ul>
      </nav>
    </div>
  )
}

export default Navbar
