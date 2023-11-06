import {AbstractCell} from "./AbstractCell";
import {CELL_TYPE} from "../globaux/enums";

export class ObstacleCell extends AbstractCell {

    public constructor(id: number) {
        super();
        this.id = id;
        this.type = CELL_TYPE.OBSTACLE_CELL;
    }

    /*


    public void _findWalkableCells(Map<AbstractCell, integer> targetCells, integer currDist, integer maxDist) {
        return;
    }

    public void _findWalkablePaths(Array<Array<AbstractCell>> paths, Array<AbstractCell> path, AbstractCell targetCell, AbstractCell sourceCell, integer currDist) {
        push(path, this);
        arrayRemoveAll(paths, path);
    }

    public boolean _lineOfSightCell(AbstractCell cell, Array<AbstractEntity> entityToIgnore = []) {
        return false;
    }

    public boolean _isEmpty() {
        return false;
    }
    */
}
