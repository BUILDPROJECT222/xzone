// src/pages/index.tsx
import React, { useCallback, useEffect, useState } from "react";

import { Tweet } from "@/utils/tweetUtils";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const fetchTweets = async (newPage = 1, shouldAppend = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tweets/fetch-tweets?page=${newPage}`);
      if (!res.ok) throw new Error("Failed to fetch tweets");
      const { data, total } = await res.json();
      const processedData = data.reverse();
      setTweets((prev: any) => (shouldAppend ? [...prev, ...processedData] : [...processedData, ...prev]));
      setHasNextPage(tweets.length < total);
      setPage(newPage);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchTweets(page + 1, true);
    }
  };

  const refreshTweets = useCallback(() => {
    fetchTweets(1);
  }, []);

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="min-w-xl max-w-xl border-r border-l min-h-[100svh]">
      <header className="text-2xl font-bold pb-4 px-6 border-b pt-4">XZONE</header>
      <TweetForm onTweetPosted={refreshTweets} />
      <TweetList
        tweets={tweets}
        loading={loading}
        hasMore={hasNextPage}
        onMore={handleLoadMore}
        onUpdateTweets={setTweets}
        onLike={() => {}}
        onUnlike={() => {}}
      />
    </div>
  );
};

export default Home;
