import { createContext, useContext, useMemo, useState } from 'react';
const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  let wishlistFromStorage;
  let wishlist = [];
  if (typeof window !== 'undefined') {
    wishlistFromStorage = JSON.parse(window.localStorage.getItem('movies/wishlist'));
    if (wishlistFromStorage) {
      wishlist = wishlistFromStorage;
    }
  }
  const [wishlistState, setWishlistState] = useState({
    wishlist: wishlist
  });

  const setWishlist = newWishlist => {
    setWishlistState({
      ...wishlistState,
      wishlist: newWishlist
    });
  };

  const actions = useMemo(
    () => ({
      setWishlist
    }),
    [
      setWishlist
    ]
  );

  const contextValue = useMemo(() => [wishlistState, actions], [
    wishlistState,
    actions
  ]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}
