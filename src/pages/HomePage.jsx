import React, { useState, useEffect, useCallback, useMemo } from "react";
import FeedsList from "../components/FeedsList";
import userImg from "../assets/img/user-img.jpeg";

const user = {
  id: "123",
  name: "Sheldon Cooper",
  avatar: userImg,
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [displayPost, setDisplayPost] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  const fetchData = useMemo(
    () => async () => {
      const response = await fetch(
        "https://63d62546e60d57436973ba25.mockapi.io/users"
      );
      const fetchedData = await response.json();
      setPosts(fetchedData);
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDisplayPost(posts.slice(0, (page + 1) * itemsPerPage));
  }, [page, posts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <
      document.documentElement.offsetHeight
    ) {
      return;
    }
    if (displayPost.length < posts.length) {
      setPage((prevPage) => prevPage + 1);
      setIsLoading(true);
    } else {
      setHasMore(true);
      setIsLoading(false);
      window.removeEventListener("scroll", handleScroll);
    }
  }, [displayPost.length, posts.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div>
      <div>
        <FeedsList posts={displayPost} user={user} />
      </div>
      {isLoading && <p className='loading'>Loading...</p>}
      {hasMore && <p className='caught-up'>You're all caught up</p>}
    </div>
  );
};

export default HomePage;
