const testimonials = [
  {
    quote:
      '“Sent my recyclables within days and immediately tracked collection online. Love the rewards idea!”',
    name: 'Michael Hammond',
    avatar: '/images/user-1.jpg',
  },
  {
    quote:
      '“RecycleMate has helped our family stay organized and eco‑friendly. Five stars from us!”',
    name: 'Ama Danquah',
    avatar: '/images/user-2.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
        What Our Users Are Saying
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map(({ quote, name, avatar }) => (
          <article
            key={name}
            className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <p className="italic leading-relaxed mb-4">{quote}</p>
            <div className="flex items-center gap-3">
              <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
              <span className="font-semibold">{name}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
