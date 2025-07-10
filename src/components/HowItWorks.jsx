const howItWorks = [
    {
        title: "Schedule Pickup",
        description: "Choose your waste type, date, and location",
        icon: "🗓️"
    },
    {
        title: "Verified Pickup",
        description: "Our collectors show up when you need them",
        icon: "🚛",
    },
    {
        title: "Track & Earn",
        description: "See your pickup history and earn rewards (coming soon)",
        icon: "⭐",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 px-6 text-center bg-white  text-black">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">How RecycleMate Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {howItWorks.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 hover:border-blue-500 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">

                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm mt-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
