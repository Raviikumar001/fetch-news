const ShimmerComponent = () => {
  return (
    <div className="w-[400px] h-[300px] bg-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-[200px] bg-gray-300"></div>
      {/* Text Placeholder */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-[80%]"></div>
      </div>
    </div>
  );
};

export default ShimmerComponent;
