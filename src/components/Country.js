import "./Country.scss";

function Country({ flag, name, continent, capital }) {
  return (
    <div className="country__wrapper">
      <img src={flag} alt="flag" />
      <div className="country__detail">
        <div>
          <b>Name: {" "} </b>
          {name}
        </div>
        <div>
          <b>Continent: {" "} </b>
          {continent}
        </div>
        <div>
          <b>Capital: {" "} </b>
          {capital}
        </div>
      </div>
    </div>
  );
}

export default Country;
