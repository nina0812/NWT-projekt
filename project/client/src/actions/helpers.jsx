import axios from "axios";

export const authHeader = () => {
    const token = localStorage.getItem('user');
    if (token)
      return {headers: {'Authorization' : token} };
    else
      return {};
}
export const checkLogged = async() => {
    try {
      // posalji upit apiu da provjeri tokene
      await axios.get('http://localhost:5000/api/verifyToken', authHeader()); // axios.get vrati status 403 => return false 200 -> return true;
      
      return true;
    }
    catch(error){
      return false;
    }
}


