import axios from "axios";
import { ApiUrl } from "./apiRoutes";

export const apiUrl = import.meta.env.VITE_API;

export const fetchApi = axios.create({
  baseURL: import.meta.env.VITE_API, // Ensure this matches your backend URL
  withCredentials: true, // Allow credentials to be sent
  headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
  },
});
  class FetchData {

    async message(data){
        try {
            console.log(data,"data")
            const chatData={
              message: data.messageAI.map((msg)=>msg.message).join("\n"),
            }
            console.log(chatData)
            const response = await fetchApi.post(ApiUrl.message.CREATE, {messageAI:chatData,messageUser:data.messageUser,chatId:data.chatId});
            return await response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async signup(dat){
      try {
        const response = await fetchApi.post(ApiUrl.auth.REGISTER, dat);
        return await response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async login(data){
      try {
        const response = await fetchApi.post(ApiUrl.auth.LOGIN, data);
        return await response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async getMessages(data){
      try {
        const response = await fetchApi.get(`${ApiUrl.message.GETALLMESSAGE}?chatId=${data}`);
        return await response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async getUserConversations(data){
      try {
        const response = await fetchApi.get(`${ApiUrl.auth.USERCONVERSATION}`);
        return await response.data;
      } catch (error) {
        throw new Error(error.message);
       
      }
    }
  }

  export default new FetchData();
  