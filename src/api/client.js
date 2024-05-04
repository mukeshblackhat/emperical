export const API_ROUTES = {
   "product": {
      getAllProducts: import.meta.env.VITE_API_DOWN ? "http://localhost:3000/products" :  "https://api.restful-api.dev/objects"
   }
}