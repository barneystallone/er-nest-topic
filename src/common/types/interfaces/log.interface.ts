export interface RequestLog {
  request: {
    id: string;
    method: string;
    path: string;
    body: any;
  };

  response: Record<string, any>;
}

export interface ErrorLog {
  request: { id: string };
  error: Record<string, any>;
}
