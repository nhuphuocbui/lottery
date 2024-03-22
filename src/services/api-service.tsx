import axios from "axios";

const LOGIN_URL = "http://172.29.139.102:8088/realms/plm-service/protocol/openid-connect/token";
const EMAIL_SERVICE_URL = "http://127.0.0.1:8082/api/create_audit";
const ACCOUNT_LIST_URL = "http://corpagiledev1.na.ads.idt.com:8000/users/";
const ApiService = {
  login: async (user : any) => {
    try {
      const response = await fetch( LOGIN_URL, {
        method: "POST",
        body: new URLSearchParams({
          "username": user.email,
          "password": user.password,
          "grant_type": 'password',
          "client_id": "audit-client",
          "client_secret": "q7KnWSPihaao6Kn8JAVaiUoXmnvT5wbo",
          "scope": "openid"
        })
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  },
  sendEmail: async (data: any) => {
    try {
      const response = await axios.post(EMAIL_SERVICE_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getUserList() {
    try {
      const response = await fetch(
          ACCOUNT_LIST_URL,
          {
            method: 'GET',
            headers: {
              'Accept': '*/*',
            }
          }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  },
  async getManagerList() {
    try {
      const response = await fetch(
          ACCOUNT_LIST_URL
      );
      const data = await response.json();
      const uniqueManagerEmails: string[] = [];
      data.forEach((item: any) => {
        const managerEmail = item["Manager's Email"];
        if (managerEmail && !uniqueManagerEmails.includes(managerEmail)) {
          uniqueManagerEmails.push(managerEmail);
        }
      });
      localStorage.setItem("managerList", JSON.stringify(uniqueManagerEmails));
      return uniqueManagerEmails;

    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  },
  async getUsersByManager(managerEmail: string, data: any[]) {
    return data.filter(
        (item) => item["Manager's Email"] === managerEmail
    );
  },
  getRole(managerEmail: string) {
    const storedData = localStorage.getItem("managerList");
    const parsedData: string[] = storedData ? JSON.parse(storedData) : [];
    const isManagerInLocalStorage = parsedData.includes(managerEmail);
    return isManagerInLocalStorage ? "MANAGER" : "AUDITEE";
  }
};

export default ApiService;
