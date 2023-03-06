import CountrySelector from "./CountrySelector";
import TimeNavigator from "./TimeNavigator";
import GenerationSection from './GenerationSection';


const CardCollection = () => {

    return (
        <main className="container">
            <CountrySelector />
            <TimeNavigator />
            <GenerationSection />
        </main>
    );

}

export default CardCollection;