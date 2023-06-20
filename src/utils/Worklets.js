import "react-native-reanimated";
import { COLORS } from "../constants";
import { isNullOrUndefined } from "./common";

export function roundNumToNDecimals(num, numDecimals = 2) {
  "worklet";
  return +(Math.round(+(+num + `e+${numDecimals}`)) + `e-${numDecimals}`);
}

export function formatNum(num, numOfSigDigs = 2) {
  "worklet";
  if (isNullOrUndefined(num) || isNaN(+num)) return "";
  if (Math.abs(+num) < 1 && +num !== 0) {
    let numOfOs = 0;
    let fractionalNum = String(num).split(".")[1] || "";
    for (let char of fractionalNum) {
      if (char === "0") {
        numOfOs++;
      } else {
        break;
      }
    }
    return `${(+num).toFixed(numOfOs + numOfSigDigs + 1)}`;
  }

  const numAsStr = `${roundNumToNDecimals(num, numOfSigDigs)}`;

  const splitNum = numAsStr.split(".");
  const wholeNum = splitNum[0] || "0";
  const decimalNum = splitNum[1] || "00";

  const formattedWholeNum = (+wholeNum).toLocaleString("en-US");

  return `${formattedWholeNum}${numOfSigDigs === 0 ? "" : "."}${decimalNum
    .substring(0, numOfSigDigs)
    .padEnd(numOfSigDigs, "0")}`;
}

export function formatPercent(percent, includeSign = true) {
  "worklet";
  if (isNullOrUndefined(percent) || isNaN(+percent)) {
    return "N/A";
  }
  return +percent >= 0 ? `${includeSign === true ? "+" : ""}${formatNum(+percent)}%` : `${formatNum(+percent)}%`;
}

export function formatPrice(price, includeSign = false) {
  "worklet";
  if (isNullOrUndefined(price) || isNaN(+price)) {
    return "N/A";
  }
  return +price >= 0 ? `${includeSign === true ? "+" : ""}$${formatNum(price)}` : `-$${formatNum(+price * -1)}`;
}

export function toTimeString(date) {
  "worklet";
  const hours = date?.getHours() <= 12 ? date?.getHours() : date?.getHours() - 12;
  const formattedHour = hours < 10 ? "0" + hours : hours;
  const minutes = date?.getMinutes() < 10 ? "0" + date?.getMinutes() : date?.getMinutes();
  const amOrPm = date?.getHours() >= 12 ? "PM" : "AM";
  return formattedHour + ":" + minutes + " " + amOrPm;
}

export function formatTime(unixTime) {
  "worklet";
  const jsDate = new Date(unixTime);
  const dateStr = jsDate?.toDateString()?.split(" ")?.slice(1, 4)?.join(" ");
  const timeStr = toTimeString(jsDate);
  return `${dateStr} ${timeStr}`;
}

export function boundXCoordinateWorklet(val, upperBound, labelWidth) {
  "worklet";
  if (val + labelWidth > upperBound) {
    return val - labelWidth - 7;
  }
  return val - labelWidth / 2 < 0 ? 0 : val - labelWidth / 2;
}

export function getStylesBasedOnSignWorklet(num) {
  "worklet";
  return +num >= 0 ? { color: COLORS.SUCCESS } : { color: COLORS.ERROR };
}

export const abbreviateNum = (num) => {
  if (+num >= 1e3 && +num < 1e6) return roundNumToNDecimals(+num / 1e3) + " K";
  if (+num >= 1e6 && +num < 1e9) return roundNumToNDecimals(+num / 1e6) + " M";
  if (+num >= 1e9 && +num < 1e12) return roundNumToNDecimals(+num / 1e9) + " Bn";
  if (+num >= 1e12) return roundNumToNDecimals(+num / 1e12) + " Tr";
  return `${formatNum(num)}`;
};
