import printInfo from "./lib/printInfo";

export default function createNewEventsHandler() {
  const gameInfoOutputElement = document.querySelector("#output-events");
  const printEventInfo = printInfo(gameInfoOutputElement, eventsFormatter);

  return (data: any) => {
    printEventInfo(data);
  };
}

function eventsFormatter(info) {
  if (info.events) {
    return info.events
      .map((event) => `${event.name}: ${JSON.stringify(event.data)}`)
      .join("\n");
  } else if (info.feature) {
    return `${info.feature}: ${JSON.stringify(info.info)}`;
  }

  return JSON.stringify(info);
}
