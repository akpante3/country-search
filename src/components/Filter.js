import "./Filter.scss";

const continents = ["africa", "americas", "asia", "europe", "oceania"];

function Filter({ handleFilterChange }) {
  return (
    <div className="input-wrapper">
      <select
        className="filter__drop-down"
        name="continent"
        id="continent"
        onChange={(e) => handleFilterChange("continent", e.target.value)}
      >
        <option value="" defaultValue>
          All Continent
        </option>
        {continents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      {/* <button onClick={(e) => handleFilterChange('sort', e.target.value)}>sort</button> */}
    </div>
  );
}

export default Filter;
