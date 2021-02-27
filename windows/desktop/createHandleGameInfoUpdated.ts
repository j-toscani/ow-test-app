import { WATCHED_INFO as watchedProperties } from "./lib/constants";
import printInfo, { formatGameInfo } from "./lib/printInfo";

type UpdatedGameInfo = overwolf.games.GameInfoUpdatedEvent;

export default function createHandleGameInfoUpdated(
  changeHandlers: {
    [key: string]: Function;
  } = {}
) {
  return (data: UpdatedGameInfo) => {
    const gameInfoOutputElement = document.querySelector("#output-info");
    const printGameInfo = printInfo(gameInfoOutputElement, formatGameInfo);

    const interestingEventsThatChanged = [];

    watchedProperties.forEach((property) => {
      if (data[property]) {
        interestingEventsThatChanged.push(property);
      }
    });

    if (interestingEventsThatChanged.length) {
      handleGameInfoChange(data, changeHandlers);
      printGameInfo(data, interestingEventsThatChanged);
    }
  };
}

function handleGameInfoChange(
  data: UpdatedGameInfo,
  changeHandlers: { [key: string]: Function } = {}
) {
  watchedProperties.forEach((property) => {
    if (changeHandlers[property]) {
      changeHandlers[property](data, property);
    }
  });
}
