import React from "react";

const CardComponent = ({ sourceName, title, author, description, urlToImage, link }) => {
  const CardContent = () => (
    <>
      <div className="relative">
        <img src={urlToImage} alt={title} className="w-full h-[400px] object-cover" />
        {sourceName && <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">{sourceName}</div>}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 pr-2 flex-grow">{title}</h2>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">{author && <div className="text-sm text-gray-500">By {author}</div>}</div>
      </div>
    </>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer">
        <CardContent />
      </a>
    );
  }

  // If no link, render as a regular div
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardContent />
    </div>
  );
};

export default CardComponent;
