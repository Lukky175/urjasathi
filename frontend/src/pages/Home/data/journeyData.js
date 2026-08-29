const journeySteps = [
    {
        id: 1,
        number: "01",
        eyebrow: "CONNECT",
        title: "Bring your energy together.",
        description:
            "Connect electricity consumption, solar generation, meter readings, and other energy data into one unified view for your home or business.",

        type: "connect",

        // What Solar Sathi brings together
        highlights: [
            "Electricity consumption",
            "Solar generation",
            "Grid usage",
            "Meter & device data",
        ],

        // Small visual metric for the journey card
        metric: {
            value: "1",
            label: "unified energy view",
        },

        insight:
            "Stop switching between disconnected sources to understand your energy.",

        color: "primary",
    },

    {
        id: 2,
        number: "02",
        eyebrow: "UNDERSTAND",
        title: "See where your energy goes.",
        description:
            "Transform raw readings into clear energy patterns. Understand when you consume the most, how much solar you use, and where your energy comes from.",

        type: "understand",

        highlights: [
            "Daily consumption",
            "Hourly energy patterns",
            "Peak usage",
            "Solar contribution",
        ],

        metric: {
            value: "24/7",
            label: "energy visibility",
        },

        insight:
            "Turn numbers into a clear picture of how your energy behaves.",

        color: "secondary",
    },

    {
        id: 3,
        number: "03",
        eyebrow: "DISCOVER",
        title: "Find opportunities to save.",
        description:
            "Solar Sathi identifies inefficient usage, unusual consumption patterns, and areas where energy is being used unnecessarily.",

        type: "discover",

        highlights: [
            "Inefficient usage",
            "Unusual patterns",
            "Peak-load opportunities",
            "Energy-saving potential",
        ],

        metric: {
            value: "↑",
            label: "opportunities uncovered",
        },

        insight:
            "Know what deserves attention instead of manually searching through energy data.",

        color: "solar",
    },

    {
        id: 4,
        number: "04",
        eyebrow: "OPTIMIZE",
        title: "Make smarter energy decisions.",
        description:
            "Use intelligent recommendations and actionable insights to improve efficiency, make better use of renewable energy, and reduce unnecessary grid dependence.",

        type: "optimize",

        highlights: [
            "Smart recommendations",
            "Energy efficiency",
            "Solar utilization",
            "Demand management",
        ],

        metric: {
            value: "↓",
            label: "avoidable consumption",
        },

        insight:
            "Move from simply monitoring energy to actively improving how it is used.",

        color: "primary",
    },

    {
        id: 5,
        number: "05",
        eyebrow: "IMPACT",
        title: "Measure what changes.",
        description:
            "Track the results of better energy decisions over time and understand how consumption, renewable usage, efficiency, and savings are changing.",

        type: "impact",

        highlights: [
            "Energy saved",
            "Renewable share",
            "Grid dependence",
            "Performance over time",
        ],

        metric: {
            value: "↗",
            label: "measurable progress",
        },

        insight:
            "See the difference your decisions make and keep improving over time.",

        color: "success",
    },
];

export default journeySteps;