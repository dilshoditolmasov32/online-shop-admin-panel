import API_URL from "../api/Api";

export const getProductsData= async() =>{
    try {
        const response=await API_URL.get("products/")
      return response?.data

    } catch (error) {
       return []
    }
}

