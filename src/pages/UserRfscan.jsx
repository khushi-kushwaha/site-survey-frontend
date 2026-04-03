import React, { useState, useEffect, useRef } from "react";
import { MapPin, Trash2, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom"; // 🔥 added
import Dashboard from "../Components/Dashboard";

const UserRfscan = () => {
  const [routers, setRouters] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [tempPoint, setTempPoint] = useState(null);
  const [range, setRange] = useState(80);
  const [name, setName] = useState("");
  const [showRange, setShowRange] = useState(true);

  const imgRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // 🔥 important

  // ✅ LOAD DATA (ID based)
  useEffect(() => {
    const saved = localStorage.getItem(`rf_scan_${id}`);
    if (saved) setRouters(JSON.parse(saved));
  }, [id]);

  const handleImageClick = (e) => {
    if (!isAdding) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempPoint({ x, y });
  };

  const addRouter = () => {
    if (!tempPoint || !name) {
      toast.error("Enter name and select location");
      return;
    }

    const newRouter = {
      id: Date.now(),
      name,
      x: tempPoint.x,
      y: tempPoint.y,
      range
    };

    setRouters([...routers, newRouter]);
    resetForm();
    toast.success("Router placed!");
  };

  const resetForm = () => {
    setTempPoint(null);
    setIsAdding(false);
    setName("");
    setRange(80);
  };

  // ✅ SAVE DATA (ID based)
  const saveData = () => {
    localStorage.setItem(`rf_scan_${id}`, JSON.stringify(routers));
    toast.success("Saved successfully!");
  };

  const deleteRouter = (rid) => {
    setRouters(routers.filter(r => r.id !== rid));
    toast.success("Deleted!");
  };

  const clearAll = () => {
    setRouters([]);
    localStorage.removeItem(`rf_scan_${id}`); // 🔥 optional cleanup
    toast.success("All routers cleared");
  };

  // 🔥 Drag Feature
  const handleDrag = (e, rid) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRouters(prev =>
      prev.map(r => (r.id === rid ? { ...r, x, y } : r))
    );
  };

  return (
    <Dashboard>
      <div className="px-4 lg:px-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 lg:p-8 gap-6">

        {/* MAIN */}
        <main className="flex-1 bg-white rounded-2xl shadow-lg border flex flex-col overflow-hidden">

          {/* HEADER */}
          <header className="p-4 border-b flex flex-wrap justify-between gap-3 bg-gray-50">
            <h2 className="font-semibold text-gray-700">
              RF Planner (Site ID: {id})
            </h2>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setIsAdding(true)}
                className="px-3 py-2 bg-blue-100 text-blue-600 rounded-md text-xs"
              >
                {isAdding ? "Click on map..." : "Add Router"}
              </button>

              <button
                onClick={() => setShowRange(!showRange)}
                className="px-3 py-2 bg-gray-200 rounded-md text-xs flex items-center gap-1"
              >
                {showRange ? <Eye size={14}/> : <EyeOff size={14}/>}
                Range
              </button>

              <button
                onClick={saveData}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-xs"
              >
                Save
              </button>
            </div>
          </header>

          {/* IMAGE */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
            <div className="relative">
              <img
                ref={imgRef}
                src={localStorage.getItem(`floorplan_${id}`) || "https://via.placeholder.com/600x400"}
                alt="plan"
                className="max-w-full rounded-lg shadow cursor-crosshair"
                onClick={handleImageClick}
              />

              {/* ROUTERS */}
              {routers.map(r => (
                <div
                  key={r.id}
                  draggable
                  onDragEnd={(e) => handleDrag(e, r.id)}
                  className="absolute cursor-move -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                >
                  {showRange && (
                    <div
                      className="absolute rounded-full bg-blue-500 opacity-20"
                      style={{
                        width: `${r.range}px`,
                        height: `${r.range}px`,
                        transform: "translate(-50%, -50%)"
                      }}
                    />
                  )}

                  <MapPin className="text-blue-600" />

                  <div className="text-[10px] bg-white px-1 rounded shadow mt-1 text-center">
                    {r.name}
                  </div>
                </div>
              ))}

              {/* TEMP */}
              {tempPoint && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${tempPoint.x}%`, top: `${tempPoint.y}%` }}
                >
                  <MapPin className="text-red-500 animate-bounce" />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* SIDEBAR same as before */}
        <aside className="w-full lg:w-80 space-y-4">

          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-sm font-semibold mb-3">Add Router</h3>

            <input
              type="text"
              placeholder="Router Name"
              className="w-full border p-2 mb-3 rounded-md text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-xs text-gray-500">
              Range: {range}px
            </label>

            <input
              type="range"
              min="40"
              max="200"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 py-2 rounded-md text-xs"
              >
                <X size={14}/> Cancel
              </button>

              <button
                onClick={addRouter}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md text-xs"
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">
                Routers ({routers.length})
              </h3>

              <button onClick={clearAll} className="text-xs text-red-500">
                Clear
              </button>
            </div>

            {routers.map(r => (
              <div
                key={r.id}
                className="flex justify-between text-xs mb-2 bg-gray-50 p-2 rounded"
              >
                <span>{r.name}</span>
                <button onClick={() => deleteRouter(r.id)}>
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

export default UserRfscan;