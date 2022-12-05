import { useState } from "react";

export const useCountries = (pageRef) => {
  const [countries, setCountries] = useState([]);
  const [computedCountries, setComputedCountries] = useState([]);
  const [loading, setloading] = useState(true);

  // infinite Scroll
  const handleInfiniteScroll = (event) => {
    let bottom;
    if (pageRef && pageRef.current) {
      bottom =
        Math.ceil(pageRef.current.scrollTop + pageRef.current.clientHeight) >=
        pageRef.current.scrollHeight;
    }

    if (bottom && computedCountries.length !== countries.length) {
      console.log("log");
      const newCountriesList = [...countries];
      const countriesToMerge = newCountriesList.slice(
        0,
        computedCountries.length + 30
      );
      // if (countriesToMerge.length >= countries.length) return;
      setTimeout(() => {
        console.log(countriesToMerge);
        setComputedCountries(countriesToMerge);
      }, 1000);
    }
  };

  //  Get countries
  const fetchContries = async (
    text,
    query = { isName: false, isContinent: false }
  ) => {
    try {
      let data;
      const rootUrl = `https://restcountries.com/v3.1`;

      setloading(true);

      if (text.length === 0) {
        data = await fetch(`${rootUrl}/all`);
      } else if (query.isName) {
        data = await fetch(`${rootUrl}/name/${text}`);
      } else if (query.isContinent) {
        data = await fetch(`${rootUrl}/region/${text}`);
      }

      let json = await data.json();

      if (json.status === 404) {
        setloading(false);
        setCountries([]);
        setComputedCountries([]);
        return;
      }

      setCountries(json);
      setComputedCountries([...json].slice(0, 31));
      setloading(false);

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = () => {
    const newCountriesList = [...countries].sort((a, b) => {
      let x = a?.name?.common[0].toLowerCase();
      let y = b?.name?.common[0].toLowerCase();

      return x > y ? 1 : -1;
    });

    setCountries(newCountriesList);
    setComputedCountries([...newCountriesList].slice(0, 31));
  };

  const handleFilterChange = (type, value) => {
    if (type === "continent") {
      fetchContries(value, { isContinent: true });
    }
  };

  return [
    handleInfiniteScroll,
    computedCountries,
    fetchContries,
    loading,
    handleFilterChange,
  ];
};
