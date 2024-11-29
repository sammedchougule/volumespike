"use client";

import useStockData from "./hooks/useStockData";

const WebSockClient = () => {
  const { data, updatedKeys, error } = useStockData("ws://localhost:8080");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Real-Time Stock Data</h1>

        {error && (
          <p className="text-red-500 mb-5">
            Error: {error}
          </p>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 text-black pb-2 text-left">Stock Name</th>
              <th className="border-b-2 text-black pb-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.stock}
                className={`${
                  updatedKeys.includes(item.stock) ? "bg-yellow-300 animate-pulse" : ""
                }`}
              >
                <td className="border-b text-black py-2">{item.stock}</td>
                <td className="border-b text-black py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default WebSockClient;
