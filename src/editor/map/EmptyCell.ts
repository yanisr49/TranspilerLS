import {AbstractCell} from "./AbstractCell";
import {CELL_TYPE} from "../globaux/enums";

export class EmptyCell extends AbstractCell {

    public constructor(id: number) {
        super();
        this.id = id;
        this.type = CELL_TYPE.EMPTY_CELL;
    }

}
