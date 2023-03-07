const CountrySelector = ({ countryVal, setCountryVal }) => {
  // setState for country id

  const selectHandler = (event) => {
    let setVal = 15;

    if ([15, 16, 17].includes(+event.target.value)) {
      setVal = +event.target.value;
    }

    setCountryVal(setVal);

  };

  return (
    <section className="country-selector">
      <form action="">
        <label htmlFor="cselector">
          Select a country to see generation data:
        </label>
        <select name="country_id" id="cselector" onChange={selectHandler}>
          <option value="15">England</option>
          <option value="16">Scotland</option>
          <option value="17">Wales</option>
        </select>
      </form>
    </section>
  );
};

export default CountrySelector;