import './index.css'

const EmploymentType = props => {
  const {eachFilter, changeEmploymentType} = props
  const {label, employmentTypeId} = eachFilter

  const onChangeEmployment = event => {
    changeEmploymentType(event)
  }
  return (
    <li className="filter-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        className="input"
        onChange={onChangeEmployment}
      />
      <label htmlFor={employmentTypeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
