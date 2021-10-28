import "react-native-reanimated";

export function roundPercentWorklet(num) {
  "worklet";
  return +Number.parseFloat(num).toPrecision(2);
}

export function formatAmPmWorklet(date) {
  "worklet";
  const hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  const formattedHour = hours < 10 ? "0" + hours : hours;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  return formattedHour + ":" + minutes + " " + amOrPm;
}

export function formatTimeWorklet(date) {
  "worklet";
  const jsDate = new Date(date * 1000);
  const dateStr = jsDate.toDateString().split(" ").slice(1, 4).join(" ");
  const timeStr = formatAmPmWorklet(jsDate);
  return `${dateStr} ${timeStr}`;
}

export function boundXCoordinateWorklet(val, upperBound, labelWidth) {
  "worklet";
  if (val + labelWidth > upperBound) {
    return val - labelWidth - 7;
  }
  return val - labelWidth / 2 < 0 ? 0 : val - labelWidth / 2;
}

export function formatNumBasedOnSignWorklet(num, strToAppend = " ") {
  "worklet";
  return num >= 0 ? `+${strToAppend}${num}` : `-${strToAppend}${num * -1}`;
}

export function getStylesBasedOnSignWorklet(num) {
  "worklet";
  return num >= 0 ? { color: "#4ecf3b" } : { color: "#eb1c1b" };
}
