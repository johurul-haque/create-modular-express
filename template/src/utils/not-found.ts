import { AppError } from "@/utils/app-error";

export function notFound(message?: string) {
  throw new AppError(404, message || "Not Found");
}
