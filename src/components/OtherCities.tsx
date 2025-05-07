export default function OtherCities() {
  return (
    <div className="bg-[#222] rounded-3xl p-6">
      <h3 className="text-xl font-bold mb-4">Other Cities</h3>
      <div className="space-y-3">
        {['London', 'New York', 'Tokyo', 'Sydney'].map((city, index) => (
          <div key={index} className="bg-[#2a2a2a] rounded-2xl p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{city}</p>
              <p className="text-sm text-gray-400">Cloudy</p>
            </div>
            <p className="text-lg font-medium">24°</p>
          </div>
        ))}
      </div>
    </div>
  );
}