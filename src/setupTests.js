/**
 * Enzyme tests suite setup with React adapter.
 */

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
