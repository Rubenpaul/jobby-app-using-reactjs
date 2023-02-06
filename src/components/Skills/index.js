import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-item-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
