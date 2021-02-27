console.log("I am loaded!!!");
import registerEvents, { unregisterEvents } from "./registerEvents";
import { setFeatures } from "./setFeatures";
import createHandleGameInfoUpdated from "./createHandleGameInfoUpdated";

const handleGameInfoUpdate = createHandleGameInfoUpdated({
  runningChanged: (_data: any, property: boolean) => {
    if (property) {
      unregisterEvents();
      registerEvents();
      setTimeout(setFeatures, 1000);
    } else {
      unregisterEvents();
    }
  },
});

overwolf.games.onGameInfoUpdated.addListener(function (res) {
  handleGameInfoUpdate(res);
  console.log("onGameInfoUpdated: " + JSON.stringify(res));
});

overwolf.games.getRunningGameInfo(function (res) {
  registerEvents();
  setTimeout(setFeatures, 1000);

  console.log("getRunningGameInfo: " + JSON.stringify(res));
});
