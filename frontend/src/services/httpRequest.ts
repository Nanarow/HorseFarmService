type Method = "GET" | "POST" | "PUT" | "DELETE";

type SuccessResponse<DataType> = {
  ok: true;
  data: DataType;
};

type FailedResponse = {
  ok: false;
  error: string;
};

class HttpRequest {
  private readonly base_url: string = "http://localhost:8985";
  private content_type = "application/json";

  public async Get<DataType>(resource: string) {
    const response = await this.sendRequest<DataType>(
      "GET",
      this.base_url + resource
    );
    return response;
  }
  public async Post<DataType, BodyType = unknown>(
    resource: string,
    body: BodyType
  ) {
    const response = await this.sendRequest<DataType>(
      "POST",
      this.base_url + resource,
      JSON.stringify(body)
    );
    return response;
  }
  public async Put<DataType, BodyType = unknown>(
    resource: string,
    id: number,
    body: Partial<BodyType>
  ) {
    const response = await this.sendRequest<DataType>(
      "PUT",
      this.base_url + resource + "/" + id,
      JSON.stringify(body)
    );
    return response;
  }

  public async Delete<DataType>(resource: string, id: number) {
    const response = await this.sendRequest<DataType>(
      "DELETE",
      this.base_url + resource + "/" + id
    );
    return response;
  }

  private async sendRequest<DataType = unknown>(
    method: Method,
    endpoint: string,
    body?: string
  ) {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": this.content_type,
      },
      body: body,
      credentials: "include",
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (!response.ok) {
      const fail: FailedResponse = {
        ok: false,
        error: `${result.error}`,
      };
      return fail;
    }

    const success: SuccessResponse<DataType> = {
      ok: true,
      data: result.data as DataType,
    };
    return success;
  }
}

const http = new HttpRequest();
// type User = {
//   name: string;
// };
// const p = await http.Post<User, User>("/users", { name: "John" });

// if (p.ok) {
//   p.data.name;
// }
export { http };
