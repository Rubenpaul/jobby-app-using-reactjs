import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profile: {},
    jobsApiStatus: apiStatusConstants.initial,
    jobsList: [],
    employmentTypeList: [],
    minimumPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({profileApiStatus: apiStatusConstants.in_progress})

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const profileData = data.profile_details
      this.onSubmitProfileSuccess(profileData)
    } else {
      this.onSubmitProfileFailure()
    }
  }

  onSubmitProfileSuccess = profileData => {
    const updatedProfileData = {
      name: profileData.name,
      profileImageUrl: profileData.profile_image_url,
      shortBio: profileData.short_bio,
    }
    this.setState({
      profile: updatedProfileData,
      profileApiStatus: apiStatusConstants.success,
    })
  }

  onSubmitProfileFailure = () => {
    this.setState({profileApiStatus: apiStatusConstants.failure})
  }

  renderProfileSuccessView = () => {
    const {profile} = this.state
    return (
      <div className="profile-card">
        <img
          src={profile.profileImageUrl}
          alt="profile"
          className="profile-pic"
        />
        <h1 className="profile-heading">{profile.name}</h1>
        <p className="profile-designation">{profile.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onClickProfileRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickProfileRetryBtn = () => {
    this.setState(
      {profileApiStatus: apiStatusConstants.initial},
      this.getProfileData,
    )
  }

  renderProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderEmploymentFilter = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-container">
        {employmentTypesList.map(eachFilter => (
          <EmploymentType
            eachFilter={eachFilter}
            key={eachFilter.employmentTypeId}
            changeEmploymentType={this.changeEmploymentType}
          />
        ))}
      </ul>
    </>
  )

  changeEmploymentType = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentTypeList: [
            ...prevState.employmentTypeList,
            event.target.value,
          ],
        }),
        this.getJobsData,
      )
    }
  }

  renderSalaryRangeFilters = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-container">
        {salaryRangesList.map(eachFilter => (
          <SalaryRange
            eachFilter={eachFilter}
            key={eachFilter.salaryRangeId}
            changeSalaryRange={this.changeSalaryRange}
          />
        ))}
      </ul>
    </>
  )

  changeSalaryRange = event => {
    if (event.target.checked) {
      this.setState({minimumPackage: event.target.value}, this.getJobsData)
    }
  }

  renderSearchBox = () => {
    const {search} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          value={search}
          className="search-input"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.onClickGetSearchResults}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onClickGetSearchResults = () => {
    this.getJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({jobsApiStatus: apiStatusConstants.in_progress})

    const {employmentTypeList, minimumPackage, search} = this.state
    const employmentType = employmentTypeList.join()

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const {jobs} = data
      this.onSubmitJobSuccess(jobs)
    } else {
      this.onSubmitJobFailure()
    }
  }

  onSubmitJobSuccess = jobs => {
    const updatedJobsData = jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      packagePerAnnum: eachJob.package_per_annum,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      jobsList: updatedJobsData,
      jobsApiStatus: apiStatusConstants.success,
    })
  }

  onSubmitJobFailure = () => {
    this.setState({jobsApiStatus: apiStatusConstants.failure})
  }

  renderJobSuccessView = () => {
    const {jobsList} = this.state

    switch (jobsList.length) {
      case 0:
        return this.renderNoJobsView()
      default:
        return this.renderJobListView()
    }
  }

  renderJobListView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItem eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <div className="no-job-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-found-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    </div>
  )

  onClickJobRetry = () => {
    this.setState({jobsApiStatus: apiStatusConstants.initial}, this.getJobsData)
  }

  renderJobFailureView = () => (
    <div className="no-jobs-container">
      <div className="no-job-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="err-msg-heading">Oops! Something Went Wrong</h1>
        <p className="err-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={this.onClickJobRetry}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-bottom-container">
          <div className="profile-and-filters-container-lg">
            {this.renderProfileView()}
            <hr className="horizontal-rule" />
            {this.renderEmploymentFilter()}
            <hr className="horizontal-rule" />
            {this.renderSalaryRangeFilters()}
          </div>
          <div className="search-and-job-results-container">
            {this.renderSearchBox()}
            <div className="profile-and-filters-container-sm">
              {this.renderProfileView()}
              <hr className="horizontal-rule" />
              {this.renderEmploymentFilter()}
              <hr className="horizontal-rule" />
              {this.renderSalaryRangeFilters()}
            </div>
            {this.renderJobView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
