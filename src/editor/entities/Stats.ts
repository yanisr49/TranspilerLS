import {AbstractEntity} from "./AbstractEntity";
import {FONCTION} from "../globaux/functions";

class Stats {
    public entity: AbstractEntity;
    public TP: number;
    // public MP: number;
    // public currentLife: number;
    // public maxLife: number;
    // public strength: number;
    // public wisdom: number;
    // public agility: number;
    // public resistance: number;
    // public science: number;
    // public magic: number;
    // public relativeShield: number;
    // public absoluteShield: number;
    // Effect
    // public power: number;
    // public currentWeaponId: number;

    public constructor(entity: AbstractEntity) {
        this.entity = entity;
        this.TP = FONCTION.getTP(entity.id);

        FONCTION.arrayEvery(["test"], (x: string) => x == "5");

        FONCTION.abs(10);

        const t = FONCTION.getChipEffects(10)[0][0];

        t.iii = 5;

    }

}
