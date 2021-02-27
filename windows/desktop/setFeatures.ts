import { FEATURES as requestedFeatures } from "./lib/constants";

export function setFeatures() {
  overwolf.games.events.setRequiredFeatures(requestedFeatures, function (info) {
    if (info.error) {
      //console.log("Could not set required features: " + info.reason);
      //console.log("Trying in 2 seconds");
      window.setTimeout(setFeatures, 2000);
      return;
    }

    console.log("Set required features:");
    console.log(JSON.stringify(info));
  });
}
