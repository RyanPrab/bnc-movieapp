import '../styles/globals.css'
import { WishlistContextProvider } from '../context/wishlist';

function MyApp({ Component, pageProps }) {
  return (
    <WishlistContextProvider>
      <Component {...pageProps} />
    </WishlistContextProvider>
  );
}

export default MyApp
