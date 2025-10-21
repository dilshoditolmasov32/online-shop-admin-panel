import API_URL from "../api/Api"

export const deleteProductData=async(id)=>{
  try {
    const response=await API_URL.delete(`products/${id}`)
    return response?.data
  } catch (error) {
    return []
  }
}