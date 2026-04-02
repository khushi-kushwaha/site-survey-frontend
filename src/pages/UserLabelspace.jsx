import React, { useState, useEffect, useRef } from 'react';
import { Plus, Save, Trash2, X, Check, MapPin } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom"; // 🔥 added
import Dashboard from '../components/Dashboard';

const UserLabelspace = () => {
  const [labels, setLabels] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [tempPoint, setTempPoint] = useState(null);
  const [labelName, setLabelName] = useState('');
  const [activeColor, setActiveColor] = useState('#6366f1');

  const imgRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // 🔥 important

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  // ✅ LOAD (ID based)
  useEffect(() => {
    const saved = localStorage.getItem(`floorplan_labels_${id}`);
    if (saved) setLabels(JSON.parse(saved));
  }, [id]);

  const handleImageClick = (e) => {
    if (!isAdding) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempPoint({ x, y });
  };

  const handleDone = () => {
    if (!labelName || !tempPoint) {
      toast.error("Please enter name and click on the image!");
      return;
    }

    const newLabel = {
      id: Date.now(),
      name: labelName,
      color: activeColor,
      x: tempPoint.x,
      y: tempPoint.y
    };

    setLabels([...labels, newLabel]);
    resetForm();
    toast.success("Label added!");
  };

  const resetForm = () => {
    setLabelName('');
    setTempPoint(null);
    setIsAdding(false);
  };

  // ✅ SAVE (ID based)
  const saveToDisk = () => {
    localStorage.setItem(`floorplan_labels_${id}`, JSON.stringify(labels));
    toast.success("Saved successfully!");
  };

  const deleteLabel = (lid) => {
    setLabels(labels.filter(l => l.id !== lid));
    toast.success("Deleted!");
  };

  return (
    <Dashboard>

      {/* BACK */}
      <div className="px-4 lg:px-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 lg:p-8 gap-6">
        
        {/* MAIN */}
        <main className="flex-1 bg-white rounded-xl shadow-md border flex flex-col overflow-hidden">
          
          <header className="p-4 border-b bg-white">
            <div className="flex justify-between items-center flex-wrap gap-3">
              
              <h2 className="font-bold text-gray-700">
                Labeling (Site ID: {id})
              </h2>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAdding(true)}
                  className="px-3 py-2 bg-indigo-100 text-indigo-600 rounded text-xs"
                >
                  {isAdding ? 'Click on image...' : 'Add Label'}
                </button>

                <button 
                  onClick={saveToDisk} 
                  className="px-3 py-2 bg-indigo-600 text-white rounded text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          </header>

          {/* IMAGE */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
            <div className="relative">

              <img 
                ref={imgRef}
                src={localStorage.getItem(`floorplan_${id}`) || "https://via.placeholder.com/600x400"}
                alt="Floor Plan" 
                className="max-w-full rounded-lg shadow cursor-crosshair"
                onClick={handleImageClick}
              />

              {/* LABELS */}
              {labels.map(label => (
                <div 
                  key={label.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${label.x}%`, top: `${label.y}%` }}
                >
                  <div 
                    className="bg-white px-2 py-1 text-[10px] rounded shadow"
                    style={{ color: label.color, border: `1px solid ${label.color}` }}
                  >
                    {label.name}
                  </div>

                  <div 
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ backgroundColor: label.color }}
                  />
                </div>
              ))}

              {/* TEMP */}
              {tempPoint && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 animate-bounce"
                  style={{ left: `${tempPoint.x}%`, top: `${tempPoint.y}%` }}
                >
                  <MapPin className="text-red-500" />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 space-y-4">

          <div className={`bg-white p-4 rounded-xl ${
            isAdding ? "" : "opacity-50 pointer-events-none"
          }`}>
            <input
              type="text"
              placeholder="Label name"
              className="w-full border p-2 mb-3 rounded"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
            />

            <div className="flex gap-2 mb-3 flex-wrap">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={resetForm} className="flex-1 bg-gray-200 py-2 rounded text-xs">
                Cancel
              </button>

              <button onClick={handleDone} className="flex-1 bg-indigo-600 text-white py-2 rounded text-xs">
                Done
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl">
            <h3 className="text-sm mb-3">
              Labels ({labels.length})
            </h3>

            {labels.map(label => (
              <div key={label.id} className="flex justify-between text-xs mb-2">
                <span>{label.name}</span>
                <button onClick={() => deleteLabel(label.id)}>
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </Dashboard>
  );
};

export default UserLabelspace;