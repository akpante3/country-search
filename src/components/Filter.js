import "./Filter.scss";


const continents = [
    'africa', 'americas', 'asia', 'europe', 'oceania'
]

function Filter({ handleFilterChange }) {

  return (
    <div className="input-wrapper">
    <select className="filter__drop-down" name="continent" id="continent" onChange={(e) => handleFilterChange('continent', e.target.value)}>
        <option disabled selected >Select continent</option>
        {continents.map((continent) => (
            <option value={continent}>{continent}</option>
        ))}
         <option value='' >All</option>
    </select>
    {/* <button onClick={(e) => handleFilterChange('sort', e.target.value)}>sort</button> */}
    </div>
  );
}

export default Filter;