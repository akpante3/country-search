/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import SearchInput from "./components/SearchInput";
import { useCountries } from "./hooks/countries.js";
import Country from "./components/Country";
import Filter from "./components/Filter.js";
import "./App.scss";

function App() {
  const [searchText, setSearchText] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);
  const pageRef = useRef(null);
  const [
    handleInfiniteScroll,
    computedCountries,
    fetchContries,
    loading,
    handleFilterChange,
  ] = useCountries(pageRef);

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

  useEffect(() => {
    if (searchText.length) {
      handleUserInput();
    } else {
      fetchContries(searchText);
    }
  }, [searchText]);

  return (
    <div className="app">
      <header>
        {" "}
        <div>
          <SearchInput handleTextChange={handleTextChange} />
        </div>
        <div>
          <Filter handleFilterChange={handleFilterChange} />
        </div>
      </header>

      <div
        className="app__countries-list"
        onScroll={() => handleInfiniteScroll()}
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
        ref={pageRef}
      >
        {computedCountries.length && !loading ? (
          computedCountries.map((country, index) => (
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
      {/* <footer className="app__footer"></footer> */}
    </div>
  );
}

export default App;
