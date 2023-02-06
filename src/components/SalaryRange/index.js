import './index.css'

const SalaryRange = props => {
  const {eachFilter, changeSalaryRange} = props
  const {label, salaryRangeId} = eachFilter

  const onChangeSalaryRange = event => {
    changeSalaryRange(event)
  }

  return (
    <li className="filter-item">
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        className="input"
        name="salary-range"
        onChange={onChangeSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
