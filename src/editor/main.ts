import {Fight} from "./fight/Fight";
import {mark} from "./globaux/functions";
import {COLOR_GREEN} from "./globaux/constants";


export const FIGHT = new Fight();
FIGHT.init();

mark(FIGHT.cells[306].id, COLOR_GREEN, 1);

console.log(FIGHT.cells[306].id)
