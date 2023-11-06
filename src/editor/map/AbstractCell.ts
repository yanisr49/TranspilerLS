import {CELL_TYPE} from "../globaux/enums";
import {AbstractEntity} from "../entities/AbstractEntity";
import {FONCTION} from "../globaux/functions";
import {VoidCell} from "./VoidCell";

export abstract class AbstractCell {
    public id!: number;
    public x!: number;
    public y!: number;
    public up?: AbstractCell;
    public right?: AbstractCell;
    public down?: AbstractCell;
    public left?: AbstractCell;
    public type?: CELL_TYPE;
    public entity?: AbstractEntity;

    public init(x: number, y: number, cells: AbstractCell[]) {
        this.x = x;
        this.y = y;

        this.up = FONCTION.abs(y + 1) <= 17 - FONCTION.abs(x) ? cells[this.id - 18] : VOIDCELL;
        this.right = FONCTION.abs(x + 1) <= 17 - FONCTION.abs(y) ? cells[this.id - 17] : VOIDCELL;
        this.down = FONCTION.abs(y - 1) <= 17 - FONCTION.abs(x) ? cells[this.id + 18] : VOIDCELL;
        this.left = FONCTION.abs(x - 1) <= 17 - FONCTION.abs(y) ? cells[this.id + 17] : VOIDCELL;
    }
}

export const VOIDCELL = new VoidCell();
