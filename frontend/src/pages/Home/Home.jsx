import Hero from "./sections/Hero";
import EnergyValueStrip from "./sections/EnergyValueStrip";

import WhatWeDo from "./sections/WhatWeDo";
import JourneyTimeline from "./sections/JourneyTimeline";
import EnergyIntelligence from "./sections/EnergyIntelligence";
import WhoItsFor from "./sections/WhoItsFor";

export default function Home() {
    return (
        <main className="overflow-hidden">
            <Hero />

            <EnergyValueStrip />

            <WhatWeDo />

            <JourneyTimeline />

            <EnergyIntelligence />

            <WhoItsFor />
        </main>
    );
}