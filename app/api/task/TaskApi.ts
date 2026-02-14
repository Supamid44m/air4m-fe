import { ITaskRequestDto } from "@/app/model/inteface/task/ITaskRequestDto";
import { AxiosInstance } from "axios";
class TaskApi {
  private axios: AxiosInstance;

  private  apiPath = "/task";

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAir() {
    return this.axios.get("/air");
  }
  async getAllTask(params: { page: number; size: number }) {
    return this.axios.get(this.apiPath, { params });
  }
  async createTask(body:ITaskRequestDto){
    return this.axios.post(this.apiPath,body)
  }
}

export default TaskApi;
