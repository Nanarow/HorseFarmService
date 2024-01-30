import { ItemList } from "@shadcn/simplify/form";
import { ReactNode } from "react";

export function FileToBase64(file: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export function Base64ToUrl(base64: string) {
  const base64WithoutHeader = base64.split(",")[1];
  const binaryString = atob(base64WithoutHeader);
  const byteArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([byteArray], {
    type: base64.split(",")[0].split(":")[1],
  });
  return URL.createObjectURL(blob);
}

export function formatDate(date: Date) {
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    "T" +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":") +
    "Z07:00"
  );
}

export function getTimeDifference(
  startDate: Date,
  endDate: Date
): {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
} {
  const timeDifferenceMs = endDate.getTime() - startDate.getTime();
  const seconds = Math.floor(timeDifferenceMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    milliseconds: timeDifferenceMs,
    seconds,
    minutes,
    hours,
    days,
  };
}

export function addTimeToDate(
  startDate: Date,
  duration: {
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
  }
): Date {
  const { seconds = 0, minutes = 0, hours = 0, days = 0 } = duration;
  const endDate = new Date(startDate);
  endDate.setSeconds(endDate.getSeconds() + seconds);
  endDate.setMinutes(endDate.getMinutes() + minutes);
  endDate.setHours(endDate.getHours() + hours);
  endDate.setDate(endDate.getDate() + days);
  return endDate;
}

export function urlToEmbed(url: string) {
  const id = url.split("/").at(-1);
  if (id?.indexOf("=") == -1) {
    return "https://www.youtube.com/embed/" + id;
  }
  return "https://www.youtube.com/embed/" + id?.split("=").at(-1);
}

export function ToItemList<T extends { ID: number; Name?: string }>(
  items: T[],
  callbackName?: (item: T) => ReactNode
) {
  return items.map((item) => {
    const newItem: ItemList = {
      value: item.ID,
      label: item.Name,
    };
    if (callbackName) {
      newItem.label = callbackName(item);
    }
    return newItem;
  });
}
