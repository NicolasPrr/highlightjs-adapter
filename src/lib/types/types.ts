import { langauges } from "../constants/language";
import { themes } from "../constants/themes";

export type Themes = (typeof themes)[number];
export type Languages = (typeof langauges)[number];
