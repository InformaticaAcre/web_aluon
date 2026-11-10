export type ApiFieldError = {
  field: string;
  message: string;
  code: string;
};

export type ApiError = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors: ApiFieldError[];
};

