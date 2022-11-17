const endpoints = {
    createUser: "/user",
};

export default class BaseApi {
  constructor(adminInstance) {
    this.adminInstance = adminInstance;
  }

  // ITEM
  async getItems() {
    const response = await this.adminInstance.post(endpoints.createUser);
    return response.data;
  }
}
