import {AbstractCell} from "./AbstractCell";
import {CELL_TYPE} from "../globaux/enums";

export class VoidCell extends AbstractCell {

    public constructor() {
        super();
        this.type = CELL_TYPE.VOID_CELL;
    }

    public init(x: number, y: number, cells: AbstractCell[]) { /* NOT IMPLEMENTED */}

}
