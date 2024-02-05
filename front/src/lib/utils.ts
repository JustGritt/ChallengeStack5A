import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFormDataRequest = (body: { [key: string]: any }) => {
  const formData = new FormData();
  for (const key of Object.keys(body)) {
    const element = body[key];
    if (element instanceof FileList && element.length > 0) {
      formData.append(key, element[0]);
    } else if (
      typeof element === 'string' ||
      typeof element === 'number' ||
      typeof element === 'boolean'
    ) {
      formData.append(key, element.toString());
    } else if (element instanceof Array && element.length > 0) {
      element.forEach((value, index) => {
        if (typeof value === 'object' && !('stream' in value)) {
          appendObjectToFormData(formData, `${key}[${index}]`, value);
        } else {
          formData.append(`${key}[${index}]`, value);
        }
      });
    } else if (typeof element === 'object') {
      appendObjectToFormData(formData, key, element);
    }
  }
}

function appendObjectToFormData(
  formData: FormData,
  rootKey: string,
  object: any
) {
  for (const key in object) {
    if (object[key] !== null) {
      if (object[key] instanceof File || object[key] instanceof DateTime) {
        formData.append(`${rootKey}['${key}']`, object[key]);
      } else if (typeof object[key] === 'object') {
        appendObjectToFormData(formData, `${rootKey}['${key}']`, object[key]);
      } else if (object[key] !== undefined) {
        formData.append(`${rootKey}['${key}']`, object[key]);
      }
    }
  }
}