interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

// Interface chosen because it models
// an extendable object structure.

type StringOrStringArray =
  string | string[];

// Type chosen because unions require type aliases.

interface Notification {
  id: string;
  message: string;
}

// Interface chosen because
// EmailNotification and PushNotification
// can extend it later.

type NumberProcessor = (
  value: number
) => void;

// Function signatures are usually
// represented using type aliases.

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH";
export {};
// Union literals require a type alias.