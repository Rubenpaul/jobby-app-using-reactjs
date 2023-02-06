import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
