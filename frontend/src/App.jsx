import FlowChart from "./components/FlowChart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        MERN AI Flow App
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <FlowChart />
      </div>
    </div>
  );
}

export default App;