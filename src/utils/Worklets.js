import "react-native-reanimated";
import { COLORS } from "../constants";

export function roundToNDecimalsWorklet(num, numDecimals = 2) {
  "worklet";
  return +(Math.round(+(+num + `e+${numDecimals}`)) + `e-${numDecimals}`);
}

export function formatNumWorklet(num) {
  "worklet";
  if (num === "") return num;
  if (Math.abs(+num) < 1) {
    let numOfOs = 0;
    let fractionalNum = String(num).split(".")[1] || "";
    for (let char of fractionalNum) {
      if (char === "0") {
        numOfOs++;
      } else {
        break;
      }
    }
    return `${(+num).toFixed(numOfOs + 3)}`;
  }

  const numAsStr = `${roundToNDecimalsWorklet(num)}`;

  const splitNum = numAsStr.split(".");
  const wholeNum = splitNum[0] || "0";
  const decimalNum = splitNum[1] || "00";

  const formattedWholeNum = (+wholeNum).toLocaleString("en-US");

  return `${formattedWholeNum}.${decimalNum.substring(0, 2).padEnd(2, "0")}`;
}

export function formatPercentWorklet(percent) {
  "worklet";
  return +percent >= 0 ? `+${formatNumWorklet(percent)}%` : `${formatNumWorklet(percent)}%`;
}

export function formatPriceWorklet(price) {
  "worklet";
  return +price >= 0 ? `+${formatNumWorklet(price)}` : `-$${formatNumWorklet(+price * -1)}`;
}

export function dateToTimeStrWorklet(date) {
  "worklet";
  const hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  const formattedHour = hours < 10 ? "0" + hours : hours;
  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  return formattedHour + ":" + minutes + " " + amOrPm;
}

export function formatTimeWorklet(unixTime) {
  "worklet";
  const jsDate = new Date(unixTime);
  const dateStr = jsDate.toDateString().split(" ").slice(1, 4).join(" ");
  const timeStr = dateToTimeStrWorklet(jsDate);
  return `${dateStr} ${timeStr}`;
}

export function boundXCoordinateWorklet(val, upperBound, labelWidth) {
  "worklet";
  if (val + labelWidth > upperBound) {
    return val - labelWidth - 7;
  }
  return val - labelWidth / 2 < 0 ? 0 : val - labelWidth / 2;
}

export function addNumSign(num) {
  "worklet";
  return +num >= 0 ? `+${num}` : `-${num * -1}`;
}

export function getStylesBasedOnSignWorklet(num) {
  "worklet";
  return +num >= 0 ? { color: COLORS.SUCCESS } : { color: COLORS.ERROR };
}
