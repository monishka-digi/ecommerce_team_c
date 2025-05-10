const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    CATEGORIES: "/products/categories",
    PRODUCTS: "/products",
    CATEGORY_PRODUCTS: (categoryName: any) => `/products/category/${categoryName}`, 
    ADD_TO_CART: "/carts/add",
    SEARCH_PRODUCTS: (query: any) => `/products/search?q=${query}`,
  };
  
  export default API_ENDPOINTS;
  