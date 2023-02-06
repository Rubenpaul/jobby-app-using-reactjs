import './index.css'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-brand"
        />
      </Link>

      <ul className="nav-large-screen-container">
        <li className="nav-links-container">
          <li className="nav-link">
            <Link to="/" className="nav-style">
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/jobs" className="nav-style">
              Jobs
            </Link>
          </li>
        </li>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
      <div className="nav-mobile-container">
        <Link to="/">
          <AiFillHome color="#ffffff" size={25} />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill color="#ffffff" size={25} />
        </Link>
        <button
          type="button"
          className="logout-icon-btn"
          onClick={onClickLogout}
        >
          <FiLogOut color="#ffffff" size={25} />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
