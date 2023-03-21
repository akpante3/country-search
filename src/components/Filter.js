import "./Filter.scss";

const continents = ["africa", "americas", "asia", "europe", "oceania"];

function Filter({ handleFilterChange, isDisable }) {
  const selectStyle = {
    cursor: isDisable ? 'not-allowed' : 'pointer'
  }
  return (
    <div className="input-wrapper">
      <select
        className="filter__drop-down"
        name="continent"
        id="continent"
        onChange={(e) => handleFilterChange("continent", e.target.value)}
        disabled={isDisable}
        style={selectStyle}
      >
        <option value="" defaultValue>
        { isDisable ? '' : 'All Continent'}
        </option>
        {continents.map((continent, index) => (
          <option key={index} value={continent}>
            { isDisable ? '' : continent }
          </option>
        ))}
      </select>
      {/* <button onClick={(e) => handleFilterChange('sort', e.target.value)}>sort</button> */}
    </div>
  );
}

export default Filter;
