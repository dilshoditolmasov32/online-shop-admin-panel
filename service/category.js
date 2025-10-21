import API_URL from "../api/Api";

export const getCategoryList =async() =>{
try {
    const response= await API_URL.get("categories/")
    return response?.data
} catch (error) {
    return []
}
}