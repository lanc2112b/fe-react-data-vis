import GenGraphDisplay from "./GenGraphDisplay";
import TypeNavigator from "./TypeNavigator";

const GenerationSection = () => {

    return (
        <section className="type-nav">
            <TypeNavigator />
            <GenGraphDisplay />
        </section>
    );


}

export default GenerationSection;