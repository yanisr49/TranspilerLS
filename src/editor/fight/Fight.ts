import {AbstractCell} from "../map/AbstractCell";
import {AbstractEntity} from "../entities/AbstractEntity";
import {FONCTION} from "../globaux/functions";
import {CONSTANT} from "../globaux/constants";
import {EmptyCell} from "../map/EmptyCell";
import {ObstacleCell} from "../map/ObstacleCell";

export class Fight {
    public cells: AbstractCell[];
    public entities: AbstractEntity[];

    // public allies!: AbstractEntity[];
    // public enemies!: AbstractEntity[];
    // public myLeek: MyLeek;
    // public enemyLeek!: AbstractEntity;

    public constructor() {
        this.cells = [];
        this.entities = [];
    }

    public init() {
        this.initMap();
        //this._initAllies();
        //this._initEnemies();
    }

    /**
     * Initialise toutes la map
     */
    private initMap() {
        this.cells = [];

        // initialises toutes les cases
        for (let id of [...Array(612).keys()]) {
            this.cells.push(FONCTION.getCellContent(id) === CONSTANT.CELL_OBSTACLE ? new ObstacleCell(id) : new EmptyCell(id));
        }

        // initialise les cases d'abscisse négatives (gauche de la map)
        for (let x = -17; x < 0; x++) {
            for (let y = -17 - x; y <= 17 + x; y++) {
                this.cells[306 - 17 * x - 18 * y].init(x, y, this.cells);
            }
        }

        // initialise les cases d'abscisse positives (droite de la map)
        for (let x = 0; x < 18; x++) {
            for (let y = -17 + x; y <= 17 - x; y++) {
                this.cells[306 - 17 * x - 18 * y].init(x, y, this.cells);
            }
        }
    }

    /*
        public void _initAllies() {
            this._allies = [];
            for(integer allyId in getAllies()) {
                if(!isSummon(allyId)) {
                    if(getEntity() == allyId) {
                        this._myLeek = new MyLeek(allyId);
                    } else {
                        push(this._allies, new AllyLeek(allyId));
                    }
                }
            }
        }

        public void _initEnemies() {
            this._enemies = [];
            for(integer enemyId in getEnemies()) {
                if(!isSummon(enemyId)) {
                    push(this._enemies, new EnemyLeek(enemyId));
                }
            }
        }

        public void _refresh() {
            for(AbstractEntity allyEntity in this._allies) {
                allyEntity._refresh();
            }

            for(AbstractEntity enemyEntity in this._enemies) {
                enemyEntity._refresh();
            }

            // TODO : Récupère l'ennemie à focus
            this._enemyLeek = this._enemies[0];

            this._myLeek._refresh();
        }
        */
}
