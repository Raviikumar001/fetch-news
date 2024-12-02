import React, { useState, useRef, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { openDB } from "idb";
import CardComponent from "./card-componennt";

// Import Swiper styles
import "swiper/css";
import "swiper/css/a11y";

const useFetchWithIndexedDBCache = (url, options = {}) => {
  const memoizedOptions = React.useMemo(() => options, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const initDB = async () => {
      try {
        const db = await openDB("NewsCache", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("articles")) {
              db.createObjectStore("articles", { keyPath: "url" });
            }
          },
        });

        // Check cache
        const cachedData = await db.get("articles", url);
        if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
          setData(cachedData.data); // Use full response here
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const response = await fetch(url, memoizedOptions);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        // Store the entire response
        await db.put("articles", {
          url,
          data: result, // Save full response
          timestamp: Date.now(),
        });

        setData(result);
        setLoading(false);
      } catch (fetchError) {
        setError(fetchError);
        setLoading(false);
        setData(null);
      }
    };

    initDB();
  }, [url, memoizedOptions]);

  return {
    data,
    loading,
    error,
    clearCache: async () => {
      try {
        const db = await openDB("NewsCache", 1);
        await db.delete("articles", url);
      } catch (error) {
        console.error("Error clearing cache", error);
      }
    },
  };
};

const SwipeComponent = () => {
  const { data, loading, error } = useFetchWithIndexedDBCache("http://localhost:5000/news");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a ref for the component to use consistently
  const componentRef = useRef(null);

  // Memoize articles to prevent unnecessary re-renders
  const articles = useMemo(() => data?.articles || [], [data]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading news: {error.message}</div>;
  }

  // Render empty state
  if (articles.length === 0) {
    return <div className="text-center mt-10">No articles found</div>;
  }

  return (
    <div ref={componentRef} className="h-screen w-full overflow-hidden flex justify-center">
      <div className="relative h-full w-[80%] mt-5">
        <Swiper modules={[A11y]} spaceBetween={50} slidesPerView={1} onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)} className="w-full">
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <CardComponent sourceName={article.source.name} title={article.title} author={article.author} description={article.description} urlToImage={article.urlToImage} link={article.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwipeComponent;
