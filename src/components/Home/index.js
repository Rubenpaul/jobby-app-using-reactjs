import './index.css'

import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-brand"
          />

          <div className="nav-large-screen-container">
            <div className="nav-links-container">
              <p className="nav-link">Home</p>
              <p className="nav-link">Jobs</p>
            </div>
            <button type="button" className="logout-btn">
              Logout
            </button>
          </div>
          <div className="nav-mobile-container">
            <AiFillHome color="#ffffff" size={25} />
            <BsFillBriefcaseFill color="#ffffff" size={25} />
            <FiLogOut color="#ffffff" size={25} />
          </div>
        </div>

        <div className="home-bottom-container">
          <div className="home-details-container">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
