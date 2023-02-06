import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob
  return (
    <li className="similar-job-item-container">
      <div className="company-details-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading1">Description</h1>
      <p className="job-description1">{jobDescription}</p>
      <div className="location-and-employment-container">
        <div className="details-container">
          <MdLocationOn className="icons1" />
          <p className="details1">{location}</p>
        </div>
        <div className="details-container">
          <BsFillBriefcaseFill className="icons1" />
          <p className="details1">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
