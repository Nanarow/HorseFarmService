type Method = "GET" | "POST" | "PUT" | "DELETE";
const URL = import.meta.env.PROD
  ? "https://api.khunmafarm.site"
  : "http://localhost:8985";
class HttpRequest {
  private readonly base_url: string = URL;
  private content_type = "application/json";

  public async Get<DataType>(resource: string) {
    return await this.sendRequest<DataType>("GET", this.base_url + resource);
  }
  public async Post<DataType, BodyType = unknown>(
    resource: string,
    body: BodyType
  ) {
    return await this.sendRequest<DataType>(
      "POST",
      this.base_url + resource,
      JSON.stringify(body)
    );
  }
  public async Put<DataType, BodyType = unknown>(
    resource: string,
    id: number,
    body: BodyType
  ) {
    return await this.sendRequest<DataType>(
      "PUT",
      this.base_url + resource + "/" + id,
      JSON.stringify(body)
    );
  }

  public async Delete<DataType>(resource: string, id: number) {
    return await this.sendRequest<DataType>(
      "DELETE",
      this.base_url + resource + "/" + id
    );
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
      const fail = {
        ok: false,
        error: String(result.error),
      } as const;
      console.log(result.error);
      return fail;
    }

    const success = {
      ok: true,
      data: result.data as DataType,
    } as const;
    return success;
  }
}

const http = new HttpRequest();
export { http };
