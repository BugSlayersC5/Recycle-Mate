import { CalendarDays, CheckCircle2, Star } from 'lucide-react';

const steps = [
  {
    title: 'Schedule Pickup',
    desc: 'Select waste type, date & location',
    icon: <CalendarDays className="w-5 h-5" />,
    color: 'bg-teal-600',
  },
  {
    title: 'Verified Pickup',
    desc: 'Collectors arrive on time',
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'bg-yellow-300 text-gray-900',
  },
  {
    title: 'Track & Earn',
    desc: 'Rewards coming soon!',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-gray-800',
  },
];

export default function HowItWorksBar() {
  return (
    <section className="overflow-x-hidden -mt-8 md:-mt-10 lg:-mt-12">
      <div className="flex max-w-4xl mx-auto">
        {steps.map(({ title, desc, icon, color }, idx) => (
          <div
            key={title}
            className={`relative flex-1 py-6 ${color} text-white font-medium text-center 
              ${idx !== steps.length - 1 ? 'mr-[-24px] z-10' : ''}
            `}
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%, 24px 50%)',
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex p-2 rounded bg-white/20">{icon}</span>
              <span className="text-sm font-semibold">{title}</span>
              <span className="text-xs opacity-80">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
