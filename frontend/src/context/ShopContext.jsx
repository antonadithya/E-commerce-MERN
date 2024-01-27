import React, { createContext, useEffect, useState } from "react";

export const shopContext = createContext(null);

const getDefaultvalue = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultvalue());

  const fetchData = async () => {
    try {
      // Fetch product data
      const productResponse = await fetch("http://localhost:4000/allProduct");
      const productData = await productResponse.json();
      setAll_product(productData);

      // Check if the user is logged in and fetch cart data accordingly
      const authToken = localStorage.getItem("auth-token");
      if (authToken) {
        const cartResponse = await fetch("http://localhost:4000/getCart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": authToken,
            "Content-type": "application/json",
          },
        });
        const cartData = await cartResponse.json();
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      fetch("http://localhost:4000/addToCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({ itemId: itemId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // Handle success, update UI, etc.
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error, update UI, show user a message, etc.
        });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      fetch("http://localhost:4000/removeFormCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Success:", data);
          // Handle success, update UI, etc.
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error, update UI, show user a message, etc.
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <shopContext.Provider value={contextValue}>{props.children}</shopContext.Provider>;
};

export default ShopContextProvider;
