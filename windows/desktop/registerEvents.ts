import createHandleGameInfoUpdated from "./createHandleGameInfoUpdated";
import createNewEventsHandler from "./createNewEventsHandler";

const handleNewEvents = createNewEventsHandler();

const onErrorListener = function (info: any) {
  console.error("Error: " + JSON.stringify(info));
};

export default function registerEvents() {
  overwolf.games.events.onError.addListener(onErrorListener);
  overwolf.games.events.onInfoUpdates2.addListener(handleNewEvents);
  overwolf.games.events.onNewEvents.addListener(handleNewEvents);
}

export function unregisterEvents() {
  overwolf.games.events.onError.removeListener(onErrorListener);
  overwolf.games.events.onInfoUpdates2.removeListener(handleNewEvents);
  overwolf.games.events.onNewEvents.removeListener(handleNewEvents);
}
