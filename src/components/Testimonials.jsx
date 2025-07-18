const testimonials = [
  {
    quote:
      '“Sent my recyclables within days and immediately tracked collection online. Love the rewards idea!”',
    name: 'Michael Hammond',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHO9WjzqGyeDA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1664790350498?e=1755734400&v=beta&t=UrL7YbhDOs_xHrXsV4wnZrGXkmLr9DzfHXC0HZs24IE',
  },
  {
    quote:
      '“RecycleMate has helped our family stay organized and eco‑friendly. Five stars from us!”',
    name: 'Ama Danquah',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fHww',
  },
  {
    quote:
      '“Great platform. Easy to use and super effective for our community.”',
    name: 'Kwame Mensah',
    avatar: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww',
  },
  {
    quote:
      '“The rewards give my kids a reason to recycle. It’s fun and impactful!”',
    name: 'Adjoa Serwaa',
    avatar: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww',
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="py-16 px-6 bg-gray-200 overflow-hidden">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 hover:text-teal-600 italic">
        What Our Users Are Saying
      </h2>

      {/* Marquee container */}
      <div className="marquee overflow-hidden w-full">
        <div className="marquee-track space-x-6">
          {[...testimonials, ...testimonials].map(({ quote, name, avatar }, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-sm bg-gray-50 rounded-xl p-6 shadow hover:bg-yellow-300"
            >
              <p className="italic leading-relaxed mb-4">{quote}</p>
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
