/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import Country from "./components/Country";
import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);
  const [loading, setloading] = useState(true);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  //  fetch countries from https://restcountries.com/ API
  const fetchContries = async () => {
    let data;
    const rootUrl = `https://restcountries.com/v3.1`;

    setloading(true);

    if (searchText.length === 0) {
      data = await fetch(`${rootUrl}/all`);
    } else {
      data = await fetch(`${rootUrl}/name/${searchText}`);
    }

    let json = await data.json();

    if (json.status === 404) {
      setloading(false);
      setCountries([]);
      return;
    }

    // Check if the first element in the arr is an array
    // This will likly happen when feting ALL Countries
    if (Array.isArray(json[0])) json = json[0];
    setCountries(json);
    setloading(false);
  
    return;
  };

  // triggers when user inputs text
  const handlesearchText = () => {
    setTimeoutID(null);
    // stop timeout count if the user is still typing
    clearTimeout(timeoutID);

    setTimeoutID(
      setTimeout(() => {
        fetchContries().catch(console.error);
      }, 2200)
    );
  };

  useEffect(() => {
    handlesearchText();
  }, [searchText]);

  return (
    <div className="app">
      <div>
        <SearchInput handleTextChange={handleTextChange} />
      </div>
      <div className="app__countries-list">
        {countries.length && !loading ? (
          countries.map((country, index) => (
            <Country
              key={index}
              flag={country?.flags?.png}
              name={country?.name?.common}
              continent={country?.continents}
              capital={country?.capital}
            />
          ))
        ) : (
          <div className="app__alt-screen">
            {loading ? <div>loading!!!!!</div> : <div>NOT FOUND</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
