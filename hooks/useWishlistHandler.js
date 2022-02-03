import React, { useState, useCallback } from 'react';
import { useWishlistContext } from "../context/wishlist";

export default function useWishlistHandler() {
  const [{ wishlist }, { setWishlist }] = useWishlistContext();
  const [test, setTest] = useState(wishlist);
  const [loading, setLoading] = useState(false);

  const addToWishlist = useCallback(
    newWishlist => {
      setLoading(true);
      wishlist.push(newWishlist);
      setWishlist(wishlist);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('movies/wishlist', JSON.stringify(wishlist));
      }
      setLoading(false);
    },
    [wishlist]
  );

  const removeWishlist = useCallback(
    item => {
      setLoading(true);
      let index
      for (let i = 0; i < wishlist.length; i++) {
        const movie = wishlist[i];

        if (movie.imdbRating === item.imdbRating) {
          index = i;
          break;
        }
      }

      wishlist.splice(index, 1);
      setWishlist(wishlist);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('movies/wishlist', JSON.stringify(wishlist));
      }
      setLoading(false);
    },
    [wishlist]
  );

  return {
    addToWishlist,
    removeWishlist,
    wishlist,
    loading,
    test
  }


}
