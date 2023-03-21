/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import SearchInput from "./components/SearchInput";
import { useCountries } from "./hooks/countries.js";
import Country from "./components/Country";
import Filter from "./components/Filter.js";
import CountryDetails from "./components/CountryDetails.js";
import "./App.scss";

function App() {
  const [searchText, setSearchText] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const pageRef = useRef(null);
  const [
    handleInfiniteScroll,
    computedCountries,
    fetchContries,
    loading,
    handleFilterChange,
  ] = useCountries(pageRef);

  const setCountry = (elem) => {
    console.log(elem);
    setSelectedCountry(elem);
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  // triggers when user inputs text:: debouce concept
  const handleUserInput = () => {
    setTimeoutID(null);
    // clearTimeout if the user is still typing
    clearTimeout(timeoutID);

    setTimeoutID(
      setTimeout(() => {
        fetchContries(searchText, { isName: true });
      }, 2200)
    );
  };

  const headerStyle = {
    zIndex: selectedCountry ? "0" : "10",
  };

  useEffect(() => {
    if (searchText.length) {
      handleUserInput();
    } else {
      fetchContries(searchText);
    }
  }, [searchText]);

  return (
    <div className="app">
      <header style={headerStyle}>
        {" "}
        <div>
          <SearchInput handleTextChange={handleTextChange} />
        </div>
        <div>
          <Filter
            handleFilterChange={handleFilterChange}
            isDisable={searchText ? true : false}
          />
        </div>
      </header>
      <div
        className="app__countries-list"
        onScroll={() => handleInfiniteScroll()}
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
        ref={pageRef}
      >
        {computedCountries.length && !loading
          ? computedCountries.map((country, index) => (
              <Country
                key={index}
                flag={country?.flags?.png}
                name={country?.name?.common}
                continent={country?.continents}
                openDetailModal={() => setCountry(country)}
              />
            ))
          : null}
      </div>

      {loading && (
        <div className="app__alt-screen">
          <div>loading!!!!!</div>
        </div>
      )}

      <CountryDetails
        flag={selectedCountry?.flags?.png}
        name={selectedCountry?.name?.common}
        continent={selectedCountry?.continents}
        capital={selectedCountry?.capital}
        location={selectedCountry?.maps?.googleMaps}
        lat={selectedCountry?.latlng[0]}
        lng={selectedCountry?.latlng[1]}
        onClose={() => setCountry(null)}
      />
    </div>
  );
}

export default App;
