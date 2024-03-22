const API_URL = "http://corpagiledev1.na.ads.idt.com:8000/users/";
class UserInforService {
  async getUserList() {
    try {
      const response = await fetch(
        API_URL,
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          }
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }
  async getManagerList() {
    try {
      const response = await fetch(
        API_URL
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
  }
  async getUsersByManager(managerEmail: string, data: any[]) {
    const usersWithSameManager = data.filter(
      (item) => item["Manager's Email"] === managerEmail
    );
    return usersWithSameManager;
  }
  getRole(managerEmail: string) {
    const storedData = localStorage.getItem("managerList");
    const parsedData: string[] = storedData ? JSON.parse(storedData) : [];
    const isManagerInLocalStorage = parsedData.includes(managerEmail);
    return isManagerInLocalStorage ? "MANAGER" : "AUDITEE";
  }

}

  export default UserInforService;
