import { combineReducers } from "redux";
import roomConfiguration from "./roomConfiguration";
import robotConfiguration from "./robotConfiguration";

const rootReducer = combineReducers({
  roomConfiguration,
  robotConfiguration
});

export default rootReducer;
