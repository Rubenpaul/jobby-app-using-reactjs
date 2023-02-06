import './index.css'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-bottom-container">
            <div className="home-details-container">
              <h1 className="home-heading">Find The Job That Fits Your Life</h1>
              <p className="home-description">
                Millions of people are searching for jobs, salary information,
                company reviews. Find the job that fits your abilities and
                potential
              </p>
              <Link to="/jobs">
                <button type="button" className="find-jobs-btn">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
