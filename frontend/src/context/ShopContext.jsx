import { createContext, useEffect, useState } from "react";
import { products as staticProducts } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../config";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const navigate = useNavigate();

  // ------------------------
  // AUTH STATE
  // ------------------------
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null); // ⭐ NEW: Stores user details

  // keep token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // fetch USER info automatically when token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [token]);

  // ------------------------
  // PRODUCTS + CART
  // ------------------------

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(staticProducts);

  // fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          toast.error("Failed to load products from server");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching products from server");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // ------------------------
  // LOGOUT
  // ------------------------
  const logout = () => {
    setToken("");
    setUser(null); // ⭐ clear user info
    setCartItems({});
    navigate("/login");
  };

  // ------------------------
  // CONTEXT VALUE
  // ------------------------
  const value = {
    currency,
    delivery_fee,
    products,
    navigate,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    updateQuantity,
    cartItems,
    setCartItems,
    getCartCount,
    getCartAmount,

    // auth + user
    token,
    setToken,
    logout,
    user,
    setUser,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
