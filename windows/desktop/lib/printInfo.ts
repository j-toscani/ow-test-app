import getTime from "./getTime";

export default function printInfo(
  outputElement?: Element,
  formatter?: Function
) {
  return (data: any, infosToPrint?: any[]) => {
    if (!outputElement) {
      console.log("No output element found.");
      return;
    }

    let infoItems = [];

    if (infosToPrint && Array.isArray(infosToPrint)) {
      infoItems = infosToPrint.map((infoToPrint) => {
        const li = document.createElement("li");
        li.textContent =
          getTime(new Date()) +
          " - " +
          (formatter
            ? formatter(data, infoToPrint)
            : JSON.stringify(`${infoToPrint}: ${data}`));
        return li;
      });
    } else {
      const li = document.createElement("li");
      li.textContent =
        getTime(new Date()) +
        " - " +
        (formatter ? formatter(data) : JSON.stringify(data));
      infoItems.push(li);
    }

    infoItems.forEach((infoItem) => {
      outputElement.appendChild(infoItem);
    });
  };
}

export function formatGameInfo(
  data: overwolf.games.GameInfoUpdatedEvent,
  info: string
) {
  const { id, title, isRunning } = data.gameInfo;

  switch (info) {
    case "gameChanged":
      return `Game changed to: ${title} [${id}]`;
    case "runningChanged":
      return `Game ${title} [${id}] just ${isRunning ? "started" : "stopped"}.`;

    default:
      return `Unknown Event: ${info}.`;
  }
}
