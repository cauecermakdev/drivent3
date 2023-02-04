import { ApplicationError } from "@/protocols";

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export function erro402(): ApplicationError {
  return {
    name: "erro402",
    message: "erro402!",
  };
}
