import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import CardComponent from "./card-componennt";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading news: {error.message}</div>;
  }

  const articles = data?.articles || []; // Safely access articles from the data object
  console.log(articles);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map((article, index) => (
          <CardComponent key={index} sourceName={article.source.name} title={article.title} author={article.author} description={article.description} urlToImage={article.urlToImage} link={article.url} />
        ))}
      </div>
    </div>
  );
};

export default SwipeComponent;
