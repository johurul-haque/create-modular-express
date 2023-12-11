type ErrorSources = {
  path: string | number;
  message: string;
}[];

export interface ErrorResponse {
  success?: boolean;
  status: number;
  message: string;
  error: {
    sources: [] | ErrorSources;
    stack: string | undefined;
  };
}
