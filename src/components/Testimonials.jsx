// const testimonials = [
//   {
//     quote:
//       '“Sent my recyclables within days and immediately tracked collection online. Love the rewards idea!”',
//     name: 'Michael Hammond',
//     avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHO9WjzqGyeDA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1664790350498?e=1755734400&v=beta&t=UrL7YbhDOs_xHrXsV4wnZrGXkmLr9DzfHXC0HZs24IE',
//   },
//   {
//     quote:
//       '“RecycleMate has helped our family stay organized and eco‑friendly. Five stars from us!”',
//     name: 'Ama Danquah',
//     avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fHww',
//   },
//   {
//     quote:
//       '“Great platform. Easy to use and super effective for our community.”',
//     name: 'Kwame Mensah',
//     avatar: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww',
//   },
//   {
//     quote:
//       '“The rewards give my kids a reason to recycle. It’s fun and impactful!”',
//     name: 'Adjoa Serwaa',
//     avatar: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww',
//   },
// ];

// export default function TestimonialsMarquee() {
//   return (
//     <section className="py-16 px-6 bg-gray-200 overflow-hidden">
//       <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 hover:text-teal-600 italic">
//         What Our Users Are Saying
//       </h2>

//       {/* Marquee container */}
//       <div className="marquee overflow-hidden w-full">
//         <div className="marquee-track space-x-6">
//           {[...testimonials, ...testimonials].map(({ quote, name, avatar }, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] max-w-sm bg-gray-50 rounded-xl p-6 shadow hover:bg-yellow-300"
//             >
//               <p className="italic leading-relaxed mb-4">{quote}</p>
//               <div className="flex items-center gap-3">
//                 <img
//                   src={avatar}
//                   alt={name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <span className="font-semibold">{name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





































const testimonials = [
  {
    quote:
      'RecycleMate has made waste collection in our area much easier. It’s fast, reliable, and eco-friendly.',
    name: 'Michael Owusu',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=60',
  },
  {
    quote:
      'My family enjoys using RecycleMate. Scheduling pickups is easy, and the service has been consistent.',
    name: 'Ama Agyeman',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=60',
  },
  {
    quote:
      'It’s user-friendly, rewarding, and teaches us to take care of the environment. A brilliant solution.',
    name: 'Kwabena Mensah',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=60',
  },
  {
    quote:
      'The app is intuitive, the collectors are timely, and the rewards make recycling fun for kids.',
    name: 'Esi Serwaa',
    avatar:
      'https://images.unsplash.com/photo-1734248264537-07b579b13cae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=500&q=60',
  },
  {
    quote:
      'Using RecycleMate has helped us stay organized and reduce waste. It’s effective and convenient.',
    name: 'Yaw Frimpong',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60',
  },
  {
    quote:
      'Finally, a tech platform that solves a real local problem. I love how seamless and helpful it is.',
    name: 'Akosua Nkrumah',
    avatar:
      'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=500&q=60',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-24 m-0">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        What Our Users Are Saying
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(({ quote, name, avatar }, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:bg-yellow-100 hover:shadow-md group"
          >
            <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors text-sm sm:text-base">
              “{quote}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400 group-hover:ring-4 group-hover:ring-offset-2 transition-all duration-300"
              />
              <span className="text-gray-800 font-semibold text-sm sm:text-base">
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
