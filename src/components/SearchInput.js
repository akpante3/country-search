import "./SearchInput.scss";

function SearchInput({ handleTextChange }) {
  const handleInputChange = (e) => {
    handleTextChange(e);
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        className="input"
        placeholder="Type country name"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchInput;
