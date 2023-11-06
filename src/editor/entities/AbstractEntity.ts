import {EmptyCell} from "../map/EmptyCell";
import {CAMP_TYPE, ENTITY_TYPE} from "../globaux/enums";
import {FIGHT} from "../main";
import {getCell} from "../globaux/functions";

export abstract class AbstractEntity {
    public camp: CAMP_TYPE;
    public typeLeek!: ENTITY_TYPE;
    public id: number;
    public cell: EmptyCell;
    public currentWeapon?: number;
    public MP!: number;
    public TP!: number;
    public maxLife!: number;
    public currentLife!: number;
    // Array<Effect> _effects;
    public strength!: number;
    public wisdom!: number;
    public agility!: number;
    public resistance!: number;
    public science!: number;
    public magic!: number;
    public power!: number;
    public absoluteShield!: number;
    public relativeShield!: number;

    protected constructor(id: number, camp: number) {
        this.id = id;
        this.camp = camp;
        this.cell = FIGHT.cells[getCell(this.id)];
        this.cell.entity = this;
    }

    /*
    public void _refresh() {
        if(!isAlive(this._id)) {
            this._cell._type = CELL_EMPTY;
            this._cell._entity = null;
            removeElement(FIGHT._allies, this);
            removeElement(FIGHT._enemies, this);
            return;
        }

        this._MP = getMP(this._id);
        this._TP = getTP(this._id);
        this._maxLife = getTotalLife(this._id);
        this._currentLife = getLife(this._id);

        this._strength = getStrength(this._id);
        this._wisdom = getWisdom(this._id);
        this._agility = getAgility(this._id);
        this._resistance = getResistance(this._id);
        this._science = getScience(this._id);
        this._magic = getMagic(this._id);
        this._power = getPower(this._id);
        this._refreshEffects();

        this._absoluteShield = getAbsoluteShield(this._id);
        this._relativeShield = getRelativeShield(this._id);

        if(this._cell) {
            this._cell._type = CELL_EMPTY;
            this._cell._entity = null;
        }

        this._cell = FIGHT._cells[getCell(this._id)];
        this._cell._type = CELL_ENTITY;
        this._cell._entity = this;
    }

    public void _refreshEffects() {
        this._effects = arrayMap(getEffects(this._id), effect => new Effect(effect));
    }

    public Array<AbstractCell> _walkableCells() {
        Map<AbstractCell, integer> walkableCells = new Map();
        this._cell._up._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._right._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._down._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._left._findWalkableCells(walkableCells, 1, this._MP);

        Array<AbstractCell> orderedCells = [this._cell];
        mapRemove(walkableCells, this._cell);
        integer i = 0;
        do {
            AbstractCell? cell = mapSearch(walkableCells, i)
            if(cell != null) {
                push(orderedCells, cell);
                mapRemove(walkableCells, cell);
            } else {
                i++;
            }
        } while(!mapIsEmpty(walkableCells));

        return orderedCells;
    }

    public Array<Array<AbstractCell>> _walkablePaths(AbstractCell targetCell, integer maxLength) {
        Array<Array<AbstractCell>> paths = [];

        Array<AbstractCell> array1 = [this._cell];
        push(paths, array1);
        this._cell._up._findWalkablePaths(paths, array1, targetCell, this._cell, maxLength - 1);
        Array<AbstractCell> array2 = [this._cell];
        push(paths, array2);
        this._cell._right._findWalkablePaths(paths, array2, targetCell, this._cell, maxLength - 1);
        Array<AbstractCell> array3 = [this._cell];
        push(paths, array3);
        this._cell._down._findWalkablePaths(paths, array3, targetCell, this._cell, maxLength - 1);
        Array<AbstractCell> array4 = [this._cell];
        push(paths, array4);
        this._cell._left._findWalkablePaths(paths, array4, targetCell, this._cell, maxLength - 1);

        return paths;
    }

    public Array<AbstractCell> _walkableCells2() {

        Map<AbstractCell, integer> walkableCells = new Map();
        this._cell._up._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._right._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._down._findWalkableCells(walkableCells, 1, this._MP);
        this._cell._left._findWalkableCells(walkableCells, 1, this._MP);

        Array<AbstractCell> orderedCells = [this._cell];
        mapRemove(walkableCells, this._cell);
        integer i = 0;
        do {
            AbstractCell? cell = mapSearch(walkableCells, i)
            if(cell != null) {
                push(orderedCells, cell);
                mapRemove(walkableCells, cell);
            } else {
                i++;
            }
        } while(!mapIsEmpty(walkableCells));

        return orderedCells;
    }

    public void _moveTowardCell(EmptyCell cell) {
        this._MP -= moveTowardCell(cell._id);
        this._cell._type = CELL_EMPTY;
        this._cell._entity = null;
        this._cell = FIGHT._cells[getCell(this._id)];
        this._cell._type = CELL_ENTITY;
        this._cell._entity = this;
    }

    public boolean _lineOfSightCell(AbstractCell cell) {
        return _cell._lineOfSightCell(cell);
    }

    public boolean _lineOfSightEntity(AbstractEntity entity) {
        return _lineOfSightCell(entity._cell);
    }

    public Array<AbstractCell> _getCellsAtRange(Array<AbstractCell> cells, integer range) {
        return arrayFilter(cells, c => this._cell._distanceFromCell(c) == range);
    }

    public boolean _hasEffect(AbstractChip chip) {
        return arraySome(_effects, effect => effect._itemId == chip._id);
    }

    public integer _getPoisons() {
        return arrayFoldLeft(arrayMap(arrayFilter(this._effects, effect => effect._type == EFFECT_POISON), effect => effect._value), (a, b) => a + b, 0);
    }

    public Array<AbstractWeapon> _getWeaponList() {
        Array<AbstractWeapon> weapons = [];
        for(integer weaponId in getWeapons(this._id)) {
            push(weapons, AbstractWeapon._buildWeapon(this, weaponId));
        }
        return weapons;
    }

    public Array<AbstractChip> _getChipList() {
        Array<AbstractChip> chips = [];
        for(integer chipId in getChips(this._id)) {
            push(chips, AbstractChip._buildChip(this, chipId));
        }
        return chips;
    }

    public void _setWeapon(integer? weaponId) {
        if(this == myLeek && this._currentWeapon != weaponId) {
            setWeapon(weaponId);
            this._TP -= 1;
        }
        this._currentWeapon = weaponId;
    }
    */
}
