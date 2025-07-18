import { User, Truck, ShieldCheck } from "lucide-react";
import collectorImg from "../assets/collectors.jpeg";
import userImg from "../assets/useri.jpeg";
import adminImg from "../assets/admin.jpeg";

const roles = [
  {
    title: "User",
    desc: "Request pickups, track status,\nview history, earn rewards",
    img: userImg,
    icon: User,
  },
  {
    title: "Collector",
    desc: "See assigned jobs, accept requests,\ncomplete pickups",
    img: collectorImg,
    icon: Truck,
  },
  {
    title: "Admin",
    desc: "Manage users & collectors,\nmonitor activity, oversee requests",
    img: adminImg,
    icon: ShieldCheck,
  },
];

export default function BuiltIn() {
  return (
    <section className="bg-gray-200 py-16 px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 italic hover:animate-bounce hover:text-teal-600">
        Built for Everyone in the System
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {roles.map(({ title, desc, img, icon: Icon }) => (
          <div
            key={title}
            className="relative bg-cover bg-center rounded-xl shadow-lg overflow-hidden h-[28rem] w-full flex flex-col justify-end"
            style={{ backgroundImage: `url(${img})` }}
          >
            
            <div className="bg-white text-gray-900 p-5 m-4 rounded-lg shadow-md text-center">
              <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-teal-600 text-white">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm mt-1 whitespace-pre-line">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
