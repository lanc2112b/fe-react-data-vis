const CountrySelector = () => {
    // setState for country id
    return (
      <section className="country-selector">
        <form action="">
          <label htmlFor="cselector"></label>
          <select name="country_id" id="cselector">
            <option value="15">England</option>
            <option value="16">Scotland</option>
            <option value="17">Wales</option>
          </select>
        </form>
      </section>
    );

}

export default CountrySelector;