const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    CATEGORIES: "/products/categories",
    PRODUCTS: "/products",
    CATEGORY_PRODUCTS: (categoryName) => `/products/category/${categoryName}`, 
    ADD_TO_CART: "/carts/add",
    SEARCH_PRODUCTS: (query) => `/products/search?q=${query}`,
  };
  
  export default API_ENDPOINTS;
  