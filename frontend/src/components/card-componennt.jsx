// import React from "react";
// import { UpRightArrow } from "../svg/up-right-arrow";
// const Cardcomponennt = () => {
//   let sourceName = "Android Central";
//   let title = "Ditch the Pixel 9 and get this award-winning Android phone for a record low price this Black Friday";
//   let author = "Nicholas Sutrich";
//   let description = "The OnePlus 12 is cheaper than we expected for Black Friday, making it nearly half the price of the Google Pixel 9 Pro.";
//   let urlToImage = "https://cdn.mos.cms.futurecdn.net/xskHMTNsDeoUaW9jxDHrfS-1200-80.jpg";

//   return (
//     <div>
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded shadow">
//             <img src="/public/images/mac.jpg" alt="Placeholder" className="w-full rounded" />
//             <h2 className="text-xl font-bold">Card 1</h2>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
//             <UpRightArrow /> //open in new tab icon.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cardcomponennt;

import React from "react";
import { UpRightArrow } from "../svg/up-right-arrow";

const CardComponent = ({ sourceName, title, author, description, urlToImage, link }) => {
  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img src={urlToImage} alt={title} className="w-full h-[200px] object-cover" />
        {sourceName && <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">{sourceName}</div>}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 pr-2 flex-grow">{title}</h2>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors ml-2">
              <UpRightArrow className="w-5 h-5" />
            </a>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">{author && <div className="text-sm text-gray-500">By {author}</div>}</div>
      </div>
    </div>
  );
};

// Default props to provide fallback values
// CardComponent.defaultProps = {
//   sourceName: "",
//   title: "",
//   author: "",
//   description: "",
//   urlToImage: "https://cdn.mos.cms.futurecdn.net/xskHMTNsDeoUaW9jxDHrfS-1200-80.jpg",
//   link: "",
// };

export default CardComponent;
