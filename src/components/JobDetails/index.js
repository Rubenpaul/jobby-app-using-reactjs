import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data)
    } else {
      this.onSubmitFailure()
    }
  }

  onSubmitSuccess = data => {
    const jobData = data.job_details
    const jobDetails = {
      companyLogoUrl: jobData.company_logo_url,
      companyWebsiteUrl: jobData.company_website_url,
      employmentType: jobData.employment_type,
      id: jobData.id,
      jobDescription: jobData.job_description,
      packagePerAnnum: jobData.package_per_annum,
      location: jobData.location,
      rating: jobData.rating,
      title: jobData.title,
      lifeAtCompany: this.getLifeAtCompany(jobData),
      skills: this.getSkills(jobData),
    }

    const similarJobs = this.getSimilarJobsData(data)

    const updatedJobData = {
      jobDetails,
      similarJobs,
    }

    this.setState({
      jobData: updatedJobData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getLifeAtCompany = jobData => {
    const lifeAtCompany = jobData.life_at_company
    return {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }
  }

  getSkills = jobData => {
    const {skills} = jobData
    const skillData = skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    return skillData
  }

  getSimilarJobsData = data => {
    const similarJobsList = data.similar_jobs

    return similarJobsList.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,

      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
  }

  onSubmitFailure = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <>
        <div className="job-item-details">
          <div className="company-details-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="company-job-title-and-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <AiFillStar className="star-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-salary-container">
            <div className="location-and-employment-container">
              <div className="details-container">
                <MdLocationOn className="icons" />
                <p className="details">{location}</p>
              </div>
              <div className="details-container">
                <BsFillBriefcaseFill className="icons" />
                <p className="details">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-rules" />
          <div className="description-container">
            <h1 className="description-heading1">Description</h1>
            <a href={companyWebsiteUrl} className="anchor-tag">
              <p className="visit-text">Visit</p>
              <FiExternalLink className="external-link" />
            </a>
          </div>
          <p className="job-description1">{jobDescription}</p>
          <h1 className="details-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <Skills eachSkill={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="details-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarJobs eachJob={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
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
          onClick={this.onClickGetJobItemDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  onClickGetJobItemDetails = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
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
        <div className="job-item-details-container">
          {this.renderJobDetailsView()}
        </div>
      </>
    )
  }
}

export default JobDetails
