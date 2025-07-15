import { CheckCircle } from 'lucide-react';
import RecycleMateNavbar from '../components/Navbar';
import RecycleMateFooter from '../components/Footer';

export default function SchedulePickup() {
  return (
    <>
    <RecycleMateNavbar/>
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Schedule a Pickup</h2>
        <p className="mt-2 text-gray-600">Book your waste collection in just a few simple steps</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <form className="space-y-6">
          {/* Waste Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Waste Type *</label>
            <select className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>Select waste type</option>
              <option>Plastic</option>
              <option>Glass</option>
              <option>Metal</option>
              <option>Organic</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Pickup Location *</label>
            <input
              type="text"
              placeholder="123 Main Street, Cityville"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Date + Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Pickup Date *</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Pickup Time *</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Select time</option>
                <option>8:00 AM</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>2:00 PM</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes (Optional)</label>
            <textarea
              rows="3"
              placeholder="Any special instructions or additional information..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-white font-semibold py-3 rounded"
          >
            Confirm Pickup
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-teal-50 border border-teal-200 rounded-md p-4 max-w-xl w-full text-sm flex items-start gap-2">
        <CheckCircle className="text-teal-500 w-5 h-5 mt-0.5" />
        <p>
          <span className="font-semibold text-teal-700">Pickup information:</span> Our team will arrive within a
          2-hour window of your selected time. You’ll receive a confirmation email with tracking details.
        </p>
      </div>
    </section>
    <RecycleMateFooter/>
    </>
  );
}
