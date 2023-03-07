const TypeNavigator = ({
  typeIndex,
  setTypeIndex,
  generationmix,
}) => {

  const navigationHandler = (event) => {
    let setVal = 0;
    if (!isNaN(+event.target.value) || +event.target.value >= 0) {
      setVal = +event.target.value;
    }
    setTypeIndex(setVal);
  };

  const nextVal = typeIndex === generationmix.length - 1 ? 0 : typeIndex + 1;
  const prevVal = typeIndex === 0 ? generationmix.length - 1 : typeIndex - 1;

  const nextType = generationmix[nextVal].fuel;
  const prevType = generationmix[prevVal].fuel;
 
  const currentType = generationmix[typeIndex].fuel; 

   return (
     <section className="gen-type">
       <button className="prev" value={prevVal} onClick={navigationHandler}>
         {prevType}
       </button>
       <button disabled value={typeIndex}>
         {currentType}
       </button>
       <button className="next" value={nextVal} onClick={navigationHandler}>
         {nextType}
       </button>
     </section>
   ); 

};

export default TypeNavigator;