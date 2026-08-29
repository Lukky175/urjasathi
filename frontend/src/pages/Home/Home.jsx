import Hero from "./sections/Hero";
import EnergyValueStrip from "./sections/EnergyValueStrip";
import WhatWeDo from "./sections/WhatWeDo";
import HowItWorks from "./sections/HowItWorks";
import EnergyIntelligence from "./sections/EnergyIntelligence";

export default function Home() {
    return (
        <main className="overflow-hidden">
            <Hero />

            <EnergyValueStrip />

            <WhatWeDo />

            <HowItWorks />

            <EnergyIntelligence />
        </main>
    );
}