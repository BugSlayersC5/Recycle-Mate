import React, { useState } from 'react';
import Toast from './Toast'; 

const App = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setShowToast(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>

      {showToast && (
        <Toast
          message="Success! Your item was added."
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default App;
