import { User, Truck, ShieldCheck } from 'lucide-react';

const roles = [
  {
    title: 'User',
    desc:  'Request pickups, track status,\nview history, earn rewards',
    img:   '',
    icon:  User,
  },
  {
    title: 'Collector',
    desc:  'See assigned jobs, accept requests,\ncomplete pickups',
    img:   '',
    icon:  Truck,
  },
  {
    title: 'Admin',
    desc:  'Manage users & collectors,\nmonitor activity, oversee requests',
    img:   '',
    icon:  ShieldCheck,
  },
];

export default function BuiltIn() {
  return (
    <section className="bg-gray-200 py-16 px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
        Built for Everyone in the System
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {roles.map(({ title, desc, img, icon: Icon }) => (
          <div
            key={title}
            className="bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <img src={img} alt={title} className="h-48 w-full object-cover" />
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded bg-teal-600 text-white">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm mt-1 whitespace-pre-line text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
