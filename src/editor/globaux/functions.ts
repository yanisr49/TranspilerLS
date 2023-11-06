// noinspection JSUnusedGlobalSymbols

export class FONCTION {

    /**
     * <p><b>id : </b>1</p>
     * <p><b>name : </b>abs</p>
     * <p><b>description : </b>Renvoie la valeur absolue du nombre <i>number</i>.</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static abs = (_number: number): number => { };

    /**
     * <p><b>id : </b>7</p>
     * <p><b>name : </b>acos</p>
     * <p><b>description : </b>Calcule l'arc cosinus d'<i>argument</i>, dans l'intervalle [0, PI].</p>
     * <p><b>operations : </b>12</p>
     */
        // @ts-ignore
    static acos = (_argument: number): number => { };

    /**
     * <p><b>id : </b>400</p>
     * <p><b>name : </b>arrayChunk</p>
     * <p><b>description : </b>Découpe la liste <i>array</i> en sous-listes de taille <i>chunkSize</i> maximum et renvoie la liste de ces sous-listes.
     *
     * La dernière sous-liste peut contenir moins de <i>chunkSize</i> élements.</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayChunk = <T>(_array: T[], _chunkSize?: number): T[][] => { };

    /**
     * <p><b>id : </b>396</p>
     * <p><b>name : </b>arrayClear</p>
     * <p><b>description : </b>Vide la liste <i>array</i> de tous ses éléments.</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static arrayClear = <T>(_array: T[]): void => { };

    /**
     * <p><b>id : </b>287</p>
     * <p><b>name : </b>arrayConcat</p>
     * <p><b>description : </b>Retourne une nouvelle liste contenant tous les éléments des listes passées en paramètre bout à bout.
     *
     * Cette fonction est équivalente à <i>liste1 + liste2</i>./p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayConcat = <T>(_array1: T[], _array2: T[]): T[] => { };

    /**
     * <p><b>id : </b>395</p>
     * <p><b>name : </b>arrayEvery</p>
     * <p><b>description : </b>Renvoie <i>true</i> si le prédicat <i>callback</i> appliqué à chacun des éléments de la liste renvoie <i>true</i>.</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayEvery = <T>(_array: T[], _callback: (arg: T) => boolean): boolean => { };

    /**
     * <p><b>id : </b>280</p>
     * <p><b>name : </b>arrayFilter</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayFilter = <T>(_array: T[], _callback: (arg: T) => boolean): T[] => { };

    /**
     * <p><b>id : </b>282</p>
     * <p><b>name : </b>arrayFlatten</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>∞</p>
     */
        // @ts-ignore
    static arrayFlatten = <T>(_array: T[], _depth?: number): T[] => { };

    /**
     * <p><b>id : </b>283</p>
     * <p><b>name : </b>arrayFoldLeft</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayFoldLeft = (_array: T[], _f: (arg1: T, arg2: T, arg3: number) => T, _v0: T): T => { };

    /**
     * <p><b>id : </b>284</p>
     * <p><b>name : </b>arrayFoldRight</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayFoldRight = <T>(_array: T[], _f: (arg1: T, arg2: T, arg3: number) => T, _v0: T): T => { };

    /**
     * <p><b>id : </b>402</p>
     * <p><b>name : </b>arrayFrequencies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayFrequencies = <T>(_array: T[]): Map<T, _number> => { };

    /**
     * <p><b>id : </b>406</p>
     * <p><b>name : </b>arrayGet</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static arrayGet = <T>(_array: T[], _index: number, _defaultValue?: T): T => { };

    /**
     * <p><b>id : </b>286</p>
     * <p><b>name : </b>arrayIter</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayIter = <T>(_array: T[], _callback: (arg: T) => void): void => { };

    /**
     * <p><b>id : </b>279</p>
     * <p><b>name : </b>arrayMap</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayMap = <T, U>(_array: T[], _callback: (arg: T) => U): U[] => { };

    /**
     * <p><b>id : </b>57</p>
     * <p><b>name : </b>arrayMax</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayMax = <T>(_array: T[]): T => { };

    /**
     * <p><b>id : </b>56</p>
     * <p><b>name : </b>arrayMin</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayMin = <T>(_array: T[]): T => { };

    /**
     * <p><b>id : </b>285</p>
     * <p><b>name : </b>arrayPartition</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayPartition = <T>(_array: T[], _callback: (arg1: T, arg2: number, arg3: T[]) => boolean): T[][] => { };

    /**
     * <p><b>id : </b>398</p>
     * <p><b>name : </b>arrayRandom</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayRandom = <T>(_array: T[], _count: number): T[] => { };

    /**
     * <p><b>id : </b>404</p>
     * <p><b>name : </b>arrayRemoveAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arrayRemoveAll = <T>(_array: T[], _element: T): void => { };

    /**
     * <p><b>id : </b>405</p>
     * <p><b>name : </b>arraySlice</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arraySlice = <T>(_array: T[], _start: number, _end?: number, _stride?: number): T[] => { };

    /**
     * <p><b>id : </b>394</p>
     * <p><b>name : </b>arraySome</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static arraySome = <T>(_array: T[], _callback: (arg: T) => boolean): boolean => { };

    /**
     * <p><b>id : </b>288</p>
     * <p><b>name : </b>arraySort</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(nlog(n))</p>
     */
        // @ts-ignore
    static arraySort = <T>(_array: T[], _callback?: (arg1: T, arg2: T) => number): T[] => { };

    /**
     * <p><b>id : </b>401</p>
     * <p><b>name : </b>arrayUnique</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n²)</p>
     */
        // @ts-ignore
    static arrayUnique = <T>(_array: T[]): T[] => { };

    /**
     * <p><b>id : </b>8</p>
     * <p><b>name : </b>asin</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>12</p>
     */
        // @ts-ignore
    static asin = (_argument: number): number => { };

    /**
     * <p><b>id : </b>9</p>
     * <p><b>name : </b>atan</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static atan = (_argument: number): number => { };

    /**
     * <p><b>id : </b>12</p>
     * <p><b>name : </b>atan2</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>35</p>
     */
        // @ts-ignore
    static atan2 = (_y: number, _x: number): number => { };

    /**
     * <p><b>id : </b>59</p>
     * <p><b>name : </b>average</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static average = (_array: number[]): number => { };

    /**
     * <p><b>id : </b>416</p>
     * <p><b>name : </b>binString</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static binString = (_x: number): string => { };

    /**
     * <p><b>id : </b>409</p>
     * <p><b>name : </b>bitCount</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static bitCount = (_x: number): number => { };

    /**
     * <p><b>id : </b>412</p>
     * <p><b>name : </b>bitReverse</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static bitReverse = (_x: number): number => { };

    /**
     * <p><b>id : </b>419</p>
     * <p><b>name : </b>bitsToReal</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static bitsToReal = (_x: number): number => { };

    /**
     * <p><b>id : </b>413</p>
     * <p><b>name : </b>byteReverse</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static byteReverse = (_x: number): number => { };

    /**
     * <p><b>id : </b>190</p>
     * <p><b>name : </b>canUseChip</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>45</p>
     */
        // @ts-ignore
    static canUseChip = (_chip: number, _entity: number): boolean => { };

    /**
     * <p><b>id : </b>191</p>
     * <p><b>name : </b>canUseChipOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>45</p>
     */
        // @ts-ignore
    static canUseChipOnCell = (_chip: number, _cell: number): boolean => { };

    /**
     * <p><b>id : </b>241</p>
     * <p><b>name : </b>canUseWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>45</p>
     */
        // @ts-ignore
    static canUseWeapon = (_weapon?: number, _entity: number): boolean => { };

    /**
     * <p><b>id : </b>242</p>
     * <p><b>name : </b>canUseWeaponOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>45</p>
     */
        // @ts-ignore
    static canUseWeaponOnCell = (_weapon?: number, _cell: number): boolean => { };

    /**
     * <p><b>id : </b>17</p>
     * <p><b>name : </b>cbrt</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>62</p>
     */
        // @ts-ignore
    static cbrt = (_number: number): number => { };

    /**
     * <p><b>id : </b>13</p>
     * <p><b>name : </b>ceil</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static ceil = (_number: number): number => { };

    /**
     * <p><b>id : </b>27</p>
     * <p><b>name : </b>charAt</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>8</p>
     */
        // @ts-ignore
    static charAt = (_string: string, _position: number): string => { };

    /**
     * <p><b>id : </b>313</p>
     * <p><b>name : </b>chipNeedLos</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static chipNeedLos = (_chip: number): boolean => { };

    /**
     * <p><b>id : </b>359</p>
     * <p><b>name : </b>clearMarks</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static clearMarks = (): void => { };

    /**
     * <p><b>id : </b>363</p>
     * <p><b>name : </b>clone</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>∞</p>
     */
        // @ts-ignore
    static clone = <T>(_value: T, _level?: number): T => { };

    /**
     * <p><b>id : </b>424</p>
     * <p><b>name : </b>codePointAt</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static codePointAt = (_string: string, _index?: number): number => { };

    /**
     * <p><b>id : </b>40</p>
     * <p><b>name : </b>contains</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static contains = (_string: string, _search: string): boolean => { };

    /**
     * <p><b>id : </b>4</p>
     * <p><b>name : </b>cos</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static cos = (_angle: number): number => { };

    /**
     * <p><b>id : </b>41</p>
     * <p><b>name : </b>count</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static count = <T>(_array: T[]): number => { };

    /**
     * <p><b>id : </b>161</p>
     * <p><b>name : </b>debug</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static debug = <T>(_object: T): void => { };

    /**
     * <p><b>id : </b>324</p>
     * <p><b>name : </b>debugC</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static debugC = <T>(_object: T, _color: number): void => { };

    /**
     * <p><b>id : </b>166</p>
     * <p><b>name : </b>debugE</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static debugE = <T>(_object: T): void => { };

    /**
     * <p><b>id : </b>165</p>
     * <p><b>name : </b>debugW</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static debugW = <T>(_object: T): void => { };

    /**
     * <p><b>id : </b>277</p>
     * <p><b>name : </b>deleteRegister</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>16</p>
     */
        // @ts-ignore
    static deleteRegister = (_key: string): void => { };

    /**
     * <p><b>id : </b>39</p>
     * <p><b>name : </b>endsWith</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static endsWith = (_string: string, _suffix: string): boolean => { };

    /**
     * <p><b>id : </b>20</p>
     * <p><b>name : </b>exp</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static exp = (_number: number): number => { };

    /**
     * <p><b>id : </b>61</p>
     * <p><b>name : </b>fill</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static fill = <T>(_array: T[], _value: T, _size?: number): void => { };

    /**
     * <p><b>id : </b>14</p>
     * <p><b>name : </b>floor</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static floor = (_number: number): number => { };

    /**
     * <p><b>id : </b>181</p>
     * <p><b>name : </b>getAbsoluteShield</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getAbsoluteShield = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>70</p>
     * <p><b>name : </b>getAgility</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getAgility = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>258</p>
     * <p><b>name : </b>getAIID</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getAIID = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>260</p>
     * <p><b>name : </b>getAIName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getAIName = (_entity?: number): string => { };

    /**
     * <p><b>id : </b>130</p>
     * <p><b>name : </b>getAliveAllies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getAliveAllies = (): number[] => { };

    /**
     * <p><b>id : </b>122</p>
     * <p><b>name : </b>getAliveEnemies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getAliveEnemies = (): number[] => { };

    /**
     * <p><b>id : </b>123</p>
     * <p><b>name : </b>getAliveEnemiesCount</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getAliveEnemiesCount = (): number => { };

    /**
     * <p><b>id : </b>348</p>
     * <p><b>name : </b>getAllChips</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>200</p>
     */
        // @ts-ignore
    static getAllChips = (): number[] => { };

    /**
     * <p><b>id : </b>350</p>
     * <p><b>name : </b>getAllEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>200</p>
     */
        // @ts-ignore
    static getAllEffects = (): number[] => { };

    /**
     * <p><b>id : </b>345</p>
     * <p><b>name : </b>getAlliedTurret</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getAlliedTurret = (): number => { };

    /**
     * <p><b>id : </b>193</p>
     * <p><b>name : </b>getAllies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getAllies = (): number[] => { };

    /**
     * <p><b>id : </b>132</p>
     * <p><b>name : </b>getAlliesCount</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getAlliesCount = (): number => { };

    /**
     * <p><b>id : </b>140</p>
     * <p><b>name : </b>getAlliesLife</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static getAlliesLife = (): number => { };

    /**
     * <p><b>id : </b>349</p>
     * <p><b>name : </b>getAllWeapons</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>200</p>
     */
        // @ts-ignore
    static getAllWeapons = (): number[] => { };

    /**
     * <p><b>id : </b>296</p>
     * <p><b>name : </b>getBirthTurn</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getBirthTurn = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>229</p>
     * <p><b>name : </b>getBlue</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static getBlue = (_color: number): number => { };

    /**
     * <p><b>id : </b>343</p>
     * <p><b>name : </b>getBulbChips</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static getBulbChips = (_bulbChip: number): number[] => { };

    /**
     * <p><b>id : </b>72</p>
     * <p><b>name : </b>getCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getCell = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>113</p>
     * <p><b>name : </b>getCellContent</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>6</p>
     */
        // @ts-ignore
    static getCellContent = (_cell: number): number => { };

    /**
     * <p><b>id : </b>108</p>
     * <p><b>name : </b>getCellDistance</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getCellDistance = (_cell1: number, _cell2: number): number => { };

    /**
     * <p><b>id : </b>169</p>
     * <p><b>name : </b>getCellFromXY</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getCellFromXY = (_x: number, _y: number): number => { };

    /**
     * <p><b>id : </b>270</p>
     * <p><b>name : </b>getCellsToUseChip</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25834</p>
     */
        // @ts-ignore
    static getCellsToUseChip = (_chip: number, _entity: number, _ignoredCells?: number[]): number[] => { };

    /**
     * <p><b>id : </b>269</p>
     * <p><b>name : </b>getCellsToUseChipOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25834</p>
     */
        // @ts-ignore
    static getCellsToUseChipOnCell = (_chip: number, _cell: number, _ignoredCells?: number[]): number[] => { };

    /**
     * <p><b>id : </b>216</p>
     * <p><b>name : </b>getCellsToUseWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25834</p>
     */
        // @ts-ignore
    static getCellsToUseWeapon = (_weapon?: number, _entity: number, _ignoredCells?: number[]): number[] => {};

    /**
     * <p><b>id : </b>267</p>
     * <p><b>name : </b>getCellsToUseWeaponOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25834</p>
     */
        // @ts-ignore
    static getCellsToUseWeaponOnCell = (_weapon?: number, _cell: number, _ignoredCells?: number[]): number[] => { };

    /**
     * <p><b>id : </b>266</p>
     * <p><b>name : </b>getCellToUseChip</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>38080</p>
     */
        // @ts-ignore
    static getCellToUseChip = (_chip: number, _entity: number, _ignoredCells?: number[]): number => { };

    /**
     * <p><b>id : </b>265</p>
     * <p><b>name : </b>getCellToUseChipOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>38080</p>
     */
        // @ts-ignore
    static getCellToUseChipOnCell = (_chip: number, _cell: number, _ignoredCells?: number[]): number => { };

    /**
     * <p><b>id : </b>264</p>
     * <p><b>name : </b>getCellToUseWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>38080</p>
     */
        // @ts-ignore
    static getCellToUseWeapon = (_weapon?: number, _entity: number, _ignoredCells?: number[]): number => { };

    /**
     * <p><b>id : </b>263</p>
     * <p><b>name : </b>getCellToUseWeaponOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>38080</p>
     */
        // @ts-ignore
    static getCellToUseWeaponOnCell = (_weapon?: number, _cell: number, _ignoredCells?: number[]): number => { };

    /**
     * <p><b>id : </b>117</p>
     * <p><b>name : </b>getCellX</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getCellX = (_cell: number): number => { };

    /**
     * <p><b>id : </b>118</p>
     * <p><b>name : </b>getCellY</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getCellY = (_cell: number): number => { };

    /**
     * <p><b>id : </b>273</p>
     * <p><b>name : </b>getChipArea</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipArea = (_chip: number): number => { };

    /**
     * <p><b>id : </b>186</p>
     * <p><b>name : </b>getChipCooldown</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipCooldown = (_chip: number): number => { };

    /**
     * <p><b>id : </b>104</p>
     * <p><b>name : </b>getChipCost</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipCost = (_chip: number): number => { };

    /**
     * <p><b>id : </b>248</p>
     * <p><b>name : </b>getChipEffectiveArea</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>78</p>
     */
        // @ts-ignore
    static getChipEffectiveArea = (_chip: number, _cell: number, _from?: number): number[] => { };

    /**
     * <p><b>id : </b>105</p>
     * <p><b>name : </b>getChipEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>125</p>
     */
        // @ts-ignore
    static getChipEffects = (_chip: number): any[][] => { };

    /**
     * <p><b>id : </b>364</p>
     * <p><b>name : </b>getChipLaunchType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipLaunchType = (_chip: number): number => { };

    /**
     * <p><b>id : </b>327</p>
     * <p><b>name : </b>getChipMaxRange</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipMaxRange = (_chip: number): number => { };

    /**
     * <p><b>id : </b>328</p>
     * <p><b>name : </b>getChipMinRange</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipMinRange = (_chip: number): number => { };

    /**
     * <p><b>id : </b>101</p>
     * <p><b>name : </b>getChipName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getChipName = (_chip: number): string => { };

    /**
     * <p><b>id : </b>170</p>
     * <p><b>name : </b>getChips</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static getChips = (_entity?: number): number[] => { };

    /**
     * <p><b>id : </b>160</p>
     * <p><b>name : </b>getChipTargets</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static getChipTargets = (_chip: number, _cell: number): number[] => { };

    /**
     * <p><b>id : </b>224</p>
     * <p><b>name : </b>getColor</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getColor = (_red: number, _green: number, _blue: number): number => { };

    /**
     * <p><b>id : </b>272</p>
     * <p><b>name : </b>getCooldown</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static getCooldown = (_chip: number, _entity?: number): number => { };

    /**
     * <p><b>id : </b>323</p>
     * <p><b>name : </b>getDamageReturn</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getDamageReturn = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>353</p>
     * <p><b>name : </b>getDate</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static getDate = (): string => { };

    /**
     * <p><b>id : </b>131</p>
     * <p><b>name : </b>getDeadAllies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getDeadAllies = (): number[] => { };

    /**
     * <p><b>id : </b>124</p>
     * <p><b>name : </b>getDeadEnemies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getDeadEnemies = (): number[] => { };

    /**
     * <p><b>id : </b>125</p>
     * <p><b>name : </b>getDeadEnemiesCount</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getDeadEnemiesCount = (): number => { };

    /**
     * <p><b>id : </b>185</p>
     * <p><b>name : </b>getEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getEffects = (_entity?: number): any[][] => { };

    /**
     * <p><b>id : </b>126</p>
     * <p><b>name : </b>getEnemies</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>100</p>
     */
        // @ts-ignore
    static getEnemies = (): number[] => { };

    /**
     * <p><b>id : </b>127</p>
     * <p><b>name : </b>getEnemiesCount</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getEnemiesCount = (): number => { };

    /**
     * <p><b>id : </b>139</p>
     * <p><b>name : </b>getEnemiesLife</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static getEnemiesLife = (): number => { };

    /**
     * <p><b>id : </b>346</p>
     * <p><b>name : </b>getEnemyTurret</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getEnemyTurret = (): number => { };

    /**
     * <p><b>id : </b>220</p>
     * <p><b>name : </b>getEntity</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getEntity = (): number => { };

    /**
     * <p><b>id : </b>354</p>
     * <p><b>name : </b>getEntityOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getEntityOnCell = (_cell: number): number => { };

    /**
     * <p><b>id : </b>298</p>
     * <p><b>name : </b>getEntityTurnOrder</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static getEntityTurnOrder = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>332</p>
     * <p><b>name : </b>getFarmerCountry</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getFarmerCountry = (_entity?: number): string => { };

    /**
     * <p><b>id : </b>250</p>
     * <p><b>name : </b>getFarmerID</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getFarmerID = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>252</p>
     * <p><b>name : </b>getFarmerName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getFarmerName = (_entity?: number): string => { };

    /**
     * <p><b>id : </b>129</p>
     * <p><b>name : </b>getFarthestAlly</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>31</p>
     */
        // @ts-ignore
    static getFarthestAlly = (): number => { };

    /**
     * <p><b>id : </b>120</p>
     * <p><b>name : </b>getFarthestEnemy</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>31</p>
     */
        // @ts-ignore
    static getFarthestEnemy = (): number => { };

    /**
     * <p><b>id : </b>194</p>
     * <p><b>name : </b>getFightContext</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static getFightContext = (): number => { };

    /**
     * <p><b>id : </b>347</p>
     * <p><b>name : </b>getFightID</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getFightID = (): number => { };

    /**
     * <p><b>id : </b>195</p>
     * <p><b>name : </b>getFightType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static getFightType = (): number => { };

    /**
     * <p><b>id : </b>199</p>
     * <p><b>name : </b>getFrequency</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getFrequency = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>228</p>
     * <p><b>name : </b>getGreen</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static getGreen = (_color: number): number => { };

    /**
     * <p><b>id : </b>321</p>
     * <p><b>name : </b>getLaunchedEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getLaunchedEffects = (_entity?: number): any[][] => { };

    /**
     * <p><b>id : </b>233</p>
     * <p><b>name : </b>getLeekID</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getLeekID = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>179</p>
     * <p><b>name : </b>getLevel</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getLevel = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>66</p>
     * <p><b>name : </b>getLife</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getLife = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>306</p>
     * <p><b>name : </b>getMagic</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getMagic = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>304</p>
     * <p><b>name : </b>getMapType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getMapType = (): number => { };

    /**
     * <p><b>id : </b>408</p>
     * <p><b>name : </b>getMaxRAM</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static getMaxRAM = (): number => { };

    /**
     * <p><b>id : </b>175</p>
     * <p><b>name : </b>getMessageAuthor</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getMessageAuthor = (_message: any[]): number => { };

    /**
     * <p><b>id : </b>177</p>
     * <p><b>name : </b>getMessageParams</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getMessageParams = (_message: any[]): any => { };

    /**
     * <p><b>id : </b>174</p>
     * <p><b>name : </b>getMessages</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static getMessages = (_entity?: number): any[][] => { };

    /**
     * <p><b>id : </b>176</p>
     * <p><b>name : </b>getMessageType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getMessageType = (_message: any[]): number => { };

    /**
     * <p><b>id : </b>78</p>
     * <p><b>name : </b>getMP</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getMP = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>76</p>
     * <p><b>name : </b>getName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getName = (_entity?: number): string => { };

    /**
     * <p><b>id : </b>128</p>
     * <p><b>name : </b>getNearestAlly</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getNearestAlly = (): number => { };

    /**
     * <p><b>id : </b>209</p>
     * <p><b>name : </b>getNearestAllyTo</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>35</p>
     */
        // @ts-ignore
    static getNearestAllyTo = (_entity: number): number => { };

    /**
     * <p><b>id : </b>210</p>
     * <p><b>name : </b>getNearestAllyToCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>35</p>
     */
        // @ts-ignore
    static getNearestAllyToCell = (_cell: number): number => { };

    /**
     * <p><b>id : </b>119</p>
     * <p><b>name : </b>getNearestEnemy</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getNearestEnemy = (): number => { };

    /**
     * <p><b>id : </b>211</p>
     * <p><b>name : </b>getNearestEnemyTo</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>35</p>
     */
        // @ts-ignore
    static getNearestEnemyTo = (_entity: number): number => { };

    /**
     * <p><b>id : </b>212</p>
     * <p><b>name : </b>getNearestEnemyToCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>35</p>
     */
        // @ts-ignore
    static getNearestEnemyToCell = (_cell: number): number => { };

    /**
     * <p><b>id : </b>133</p>
     * <p><b>name : </b>getNextPlayer</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>20</p>
     */
        // @ts-ignore
    static getNextPlayer = (): number => { };

    /**
     * <p><b>id : </b>271</p>
     * <p><b>name : </b>getObstacles</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>85</p>
     */
        // @ts-ignore
    static getObstacles = (): number[] => { };

    /**
     * <p><b>id : </b>301</p>
     * <p><b>name : </b>getOperations</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static getOperations = (): number => { };

    /**
     * <p><b>id : </b>337</p>
     * <p><b>name : </b>getPassiveEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>125</p>
     */
        // @ts-ignore
    static getPassiveEffects = (_entity?: number): any[][] => { };

    /**
     * <p><b>id : </b>236</p>
     * <p><b>name : </b>getPath</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n²)</p>
     */
        // @ts-ignore
    static getPath = (_start: number, _end: number, _ignoredCells?: number[]): number[] => { };

    /**
     * <p><b>id : </b>261</p>
     * <p><b>name : </b>getPathLength</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n²)</p>
     */
        // @ts-ignore
    static getPathLength = (_cell1: number, _cell2: number, _ignoredCells?: number[]): number => { };

    /**
     * <p><b>id : </b>365</p>
     * <p><b>name : </b>getPower</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getPower = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>134</p>
     * <p><b>name : </b>getPreviousPlayer</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>20</p>
     */
        // @ts-ignore
    static getPreviousPlayer = (): number => { };

    /**
     * <p><b>id : </b>227</p>
     * <p><b>name : </b>getRed</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static getRed = (_color: number): number => { };

    /**
     * <p><b>id : </b>275</p>
     * <p><b>name : </b>getRegister</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getRegister = (_key: string): string => { };

    /**
     * <p><b>id : </b>276</p>
     * <p><b>name : </b>getRegisters</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>25</p>
     */
        // @ts-ignore
    static getRegisters = (): string[] => { };

    /**
     * <p><b>id : </b>183</p>
     * <p><b>name : </b>getRelativeShield</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getRelativeShield = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>308</p>
     * <p><b>name : </b>getResistance</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getResistance = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>310</p>
     * <p><b>name : </b>getScience</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getScience = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>303</p>
     * <p><b>name : </b>getStrength</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getStrength = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>294</p>
     * <p><b>name : </b>getSummoner</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getSummoner = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>335</p>
     * <p><b>name : </b>getSummons</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getSummons = (_entity?: number): number[] => { };

    /**
     * <p><b>id : </b>254</p>
     * <p><b>name : </b>getTeamID</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTeamID = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>256</p>
     * <p><b>name : </b>getTeamName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTeamName = (_entity?: number): string => { };

    /**
     * <p><b>id : </b>352</p>
     * <p><b>name : </b>getTime</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static getTime = (): string => { };

    /**
     * <p><b>id : </b>351</p>
     * <p><b>name : </b>getTimestamp</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static getTimestamp = (): number => { };

    /**
     * <p><b>id : </b>82</p>
     * <p><b>name : </b>getTotalLife</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTotalLife = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>317</p>
     * <p><b>name : </b>getTotalMP</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTotalMP = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>319</p>
     * <p><b>name : </b>getTotalTP</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTotalTP = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>80</p>
     * <p><b>name : </b>getTP</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTP = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>121</p>
     * <p><b>name : </b>getTurn</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getTurn = (): number => { };

    /**
     * <p><b>id : </b>290</p>
     * <p><b>name : </b>getType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getType = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>407</p>
     * <p><b>name : </b>getUsedRAM</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static getUsedRAM = (): number => { };

    /**
     * <p><b>id : </b>74</p>
     * <p><b>name : </b>getWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeapon = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>274</p>
     * <p><b>name : </b>getWeaponArea</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponArea = (_weapon: number): number => { };

    /**
     * <p><b>id : </b>96</p>
     * <p><b>name : </b>getWeaponCost</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponCost = (_weapon: number): number => { };

    /**
     * <p><b>id : </b>247</p>
     * <p><b>name : </b>getWeaponEffectiveArea</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>78</p>
     */
        // @ts-ignore
    static getWeaponEffectiveArea = (_weapon?: number, _cell: number, _from?: number): number[] => { };

    /**
     * <p><b>id : </b>97</p>
     * <p><b>name : </b>getWeaponEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>125</p>
     */
        // @ts-ignore
    static getWeaponEffects = (_weapon?: number): any[][] => { };

    /**
     * <p><b>id : </b>362</p>
     * <p><b>name : </b>getWeaponLaunchType</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponLaunchType = (_weapon?: number): number => { };

    /**
     * <p><b>id : </b>329</p>
     * <p><b>name : </b>getWeaponMaxRange</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponMaxRange = (_weapon: number): number => { };

    /**
     * <p><b>id : </b>330</p>
     * <p><b>name : </b>getWeaponMinRange</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponMinRange = (_weapon: number): number => { };

    /**
     * <p><b>id : </b>93</p>
     * <p><b>name : </b>getWeaponName</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWeaponName = (_weapon: number): string => { };

    /**
     * <p><b>id : </b>338</p>
     * <p><b>name : </b>getWeaponPassiveEffects</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>125</p>
     */
        // @ts-ignore
    static getWeaponPassiveEffects = (_weapon: number): any[][] => { };

    /**
     * <p><b>id : </b>86</p>
     * <p><b>name : </b>getWeapons</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static getWeapons = (_entity?: number): number[] => { };

    /**
     * <p><b>id : </b>239</p>
     * <p><b>name : </b>getWeaponTargets</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static getWeaponTargets = (_weapon?: number, _cell: number): number[] => { };

    /**
     * <p><b>id : </b>312</p>
     * <p><b>name : </b>getWisdom</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static getWisdom = (_entity?: number): number => { };

    /**
     * <p><b>id : </b>417</p>
     * <p><b>name : </b>hexString</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static hexString = (_x: number): string => { };

    /**
     * <p><b>id : </b>25</p>
     * <p><b>name : </b>hypot</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>187</p>
     */
        // @ts-ignore
    static hypot = (_x: number, _y: number): number => { };

    /**
     * <p><b>id : </b>54</p>
     * <p><b>name : </b>inArray</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static inArray = <T>(_array: T[], _element: T): boolean => { };

    /**
     * <p><b>id : </b>200</p>
     * <p><b>name : </b>include</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static include = (_ai: string): void => { };

    /**
     * <p><b>id : </b>33</p>
     * <p><b>name : </b>indexOf</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static indexOf = (_string: string, _search: string, _start?: number): number => { };

    /**
     * <p><b>id : </b>47</p>
     * <p><b>name : </b>insert</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static insert = <T>(_array: T[], _element: T, _position: number): void => { };

    /**
     * <p><b>id : </b>443</p>
     * <p><b>name : </b>intervalAverage</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static intervalAverage = (_interval: number[]): number => { };

    /**
     * <p><b>id : </b>446</p>
     * <p><b>name : </b>intervalCombine</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static intervalCombine = (_interval1: number[], _interval2: number[]): number[] => { };

    /**
     * <p><b>id : </b>445</p>
     * <p><b>name : </b>intervalIntersection</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static intervalIntersection = (_interval1: number[], _interval2: number[]): number[] => { };

    /**
     * <p><b>id : </b>440</p>
     * <p><b>name : </b>intervalIsBounded</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsBounded = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>450</p>
     * <p><b>name : </b>intervalIsClosed</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsClosed = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>439</p>
     * <p><b>name : </b>intervalIsEmpty</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsEmpty = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>442</p>
     * <p><b>name : </b>intervalIsLeftBounded</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsLeftBounded = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>449</p>
     * <p><b>name : </b>intervalIsLeftClosed</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsLeftClosed = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>441</p>
     * <p><b>name : </b>intervalIsRightBounded</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsRightBounded = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>448</p>
     * <p><b>name : </b>intervalIsRightClosed</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalIsRightClosed = (_interval: number[]): boolean => { };

    /**
     * <p><b>id : </b>428</p>
     * <p><b>name : </b>intervalMax</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalMax = (_interval: number[]): number => { };

    /**
     * <p><b>id : </b>427</p>
     * <p><b>name : </b>intervalMin</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalMin = (_interval: number[]): number => { };

    /**
     * <p><b>id : </b>444</p>
     * <p><b>name : </b>intervalSize</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static intervalSize = (_interval: number[]): number => { };

    /**
     * <p><b>id : </b>447</p>
     * <p><b>name : </b>intervalToArray</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static intervalToArray = (_interval: number[], _step?: number): number[] => { };

    /**
     * <p><b>id : </b>90</p>
     * <p><b>name : </b>isAlive</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isAlive = (_entity: number): boolean => { };

    /**
     * <p><b>id : </b>88</p>
     * <p><b>name : </b>isAlly</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isAlly = (_entity: number): boolean => { };

    /**
     * <p><b>id : </b>232</p>
     * <p><b>name : </b>isChip</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static isChip = (_value: number): boolean => { };

    /**
     * <p><b>id : </b>89</p>
     * <p><b>name : </b>isDead</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isDead = (_entity: number): boolean => { };

    /**
     * <p><b>id : </b>62</p>
     * <p><b>name : </b>isEmpty</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static isEmpty = <T>(_array: T[]): boolean => { };

    /**
     * <p><b>id : </b>114</p>
     * <p><b>name : </b>isEmptyCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static isEmptyCell = (_cell: number): boolean => { };

    /**
     * <p><b>id : </b>87</p>
     * <p><b>name : </b>isEnemy</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isEnemy = (_entity: number): boolean => { };

    /**
     * <p><b>id : </b>344</p>
     * <p><b>name : </b>isEntity</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static isEntity = (_cell: number): boolean => { };

    /**
     * <p><b>id : </b>420</p>
     * <p><b>name : </b>isFinite</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static isFinite = (_x: number): boolean => { };

    /**
     * <p><b>id : </b>421</p>
     * <p><b>name : </b>isInfinite</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static isInfinite = (_x: number): boolean => { };

    /**
     * <p><b>id : </b>422</p>
     * <p><b>name : </b>isNaN</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static isNaN = (_x: number): boolean => { };

    /**
     * <p><b>id : </b>115</p>
     * <p><b>name : </b>isObstacle</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static isObstacle = (_cell: number): boolean => { };

    /**
     * <p><b>id : </b>112</p>
     * <p><b>name : </b>isOnSameLine</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isOnSameLine = (_cell1: number, _cell2: number): boolean => { };

    /**
     * <p><b>id : </b>423</p>
     * <p><b>name : </b>isPermutation</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static isPermutation = (_x: number, _y: number): boolean => { };

    /**
     * <p><b>id : </b>333</p>
     * <p><b>name : </b>isStatic</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isStatic = (_entity?: number): boolean => { };

    /**
     * <p><b>id : </b>292</p>
     * <p><b>name : </b>isSummon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static isSummon = (_entity?: number): boolean => { };

    /**
     * <p><b>id : </b>231</p>
     * <p><b>name : </b>isWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static isWeapon = (_value: number): boolean => { };

    /**
     * <p><b>id : </b>42</p>
     * <p><b>name : </b>join</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static join = <T>(_array: T[], _glue: string): string => { };

    /**
     * <p><b>id : </b>326</p>
     * <p><b>name : </b>jsonDecode</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static jsonDecode = (_json: string): any => { };

    /**
     * <p><b>id : </b>325</p>
     * <p><b>name : </b>jsonEncode</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>∞</p>
     */
        // @ts-ignore
    static jsonEncode = (_object: string): string => { };

    /**
     * <p><b>id : </b>206</p>
     * <p><b>name : </b>keySort</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(nlog(n))</p>
     */
        // @ts-ignore
    static keySort = <T>(_array: T[], _order?: number): void => { };

    /**
     * <p><b>id : </b>411</p>
     * <p><b>name : </b>leadingZeros</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static leadingZeros = (_x: number): number => { };

    /**
     * <p><b>id : </b>28</p>
     * <p><b>name : </b>length</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static length = (_string: string): number => { };

    /**
     * <p><b>id : </b>235</p>
     * <p><b>name : </b>lineOfSight</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>31</p>
     */
        // @ts-ignore
    static lineOfSight = (_start: number, _end: number, _entityToIgnore?: number): boolean => { };

    /**
     * <p><b>id : </b>230</p>
     * <p><b>name : </b>listen</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>78</p>
     */
        // @ts-ignore
    static listen = (): any[] => { };

    /**
     * <p><b>id : </b>18</p>
     * <p><b>name : </b>log</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>39</p>
     */
        // @ts-ignore
    static log = (_number: number): number => { };

    /**
     * <p><b>id : </b>19</p>
     * <p><b>name : </b>log10</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>23</p>
     */
        // @ts-ignore
    static log10 = (_number: number): number => { };

    /**
     * <p><b>id : </b>382</p>
     * <p><b>name : </b>log2</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static log2 = (_number: number): number => { };

    /**
     * <p><b>id : </b>370</p>
     * <p><b>name : </b>mapAverage</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapAverage = <T, U>(_map: Map<T, U>): number => { };

    /**
     * <p><b>id : </b>397</p>
     * <p><b>name : </b>mapClear</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static mapClear = <T, U>(_map: Map<T, U>): void => { };

    /**
     * <p><b>id : </b>374</p>
     * <p><b>name : </b>mapContains</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapContains = <T, U>(_map: Map<T, U>, _value: U): boolean => { };

    /**
     * <p><b>id : </b>375</p>
     * <p><b>name : </b>mapContainsKey</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static mapContainsKey = <T, U>(_map: Map<T, U>, _key: T): boolean => { };

    /**
     * <p><b>id : </b>393</p>
     * <p><b>name : </b>mapEvery</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapEvery = <T, U>(_map: Map<T, U>, _callback: (arg: T) => boolean): boolean => { };

    /**
     * <p><b>id : </b>390</p>
     * <p><b>name : </b>mapFill</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapFill = <T, U>(_map: Map<T, U>, _value: U): void => { };

    /**
     * <p><b>id : </b>389</p>
     * <p><b>name : </b>mapFilter</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapFilter = <T, U>(_map: Map<T, U>, _callback: (arg: T) => boolean): Map<T, U> => { };

    /**
     * <p><b>id : </b>391</p>
     * <p><b>name : </b>mapFold</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapFold = <T, U>(_map: Map<T, U>, _f: (arg1: U, arg2: U, arg3: T, arg4: Map<T, U>[]) => boolean, _v: U): U => { };

    /**
     * <p><b>id : </b>378</p>
     * <p><b>name : </b>mapGet</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static mapGet = <T, U>(_map: Map<T, U>, _key: T, _defaut?: U): U | undefined => { };

    /**
     * <p><b>id : </b>399</p>
     * <p><b>name : </b>mapIsEmpty</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static mapIsEmpty = <T, U>(_map: Map<T, U>): boolean => { };

    /**
     * <p><b>id : </b>381</p>
     * <p><b>name : </b>mapIter</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapIter = <T, U>(_map: Map<T, U>, _callback: (arg1: U, arg2: T, arg3: Map<T, U>) => void): void => { };

    /**
     * <p><b>id : </b>380</p>
     * <p><b>name : </b>mapKeys</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapKeys = <T, U>(_map: Map<T, U>): T[] => { };

    /**
     * <p><b>id : </b>368</p>
     * <p><b>name : </b>mapMap</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapMap = <T, U, V>(_map: Map<T, U>, _callback: (arg1: U, arg2: T, arg3: Map<T, U>) => V): Map<T, V> => { };

    /**
     * <p><b>id : </b>372</p>
     * <p><b>name : </b>mapMax</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapMax = <T, U>(_map: Map<T, U>): number => { };

    /**
     * <p><b>id : </b>388</p>
     * <p><b>name : </b>mapMerge</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapMerge = <T, U>(_map1: Map<T, U>, _map2: Map<T, U>): Map<T, U> => { };

    /**
     * <p><b>id : </b>371</p>
     * <p><b>name : </b>mapMin</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapMin = <T>(_map: Map<T, number>): number => { };

    /**
     * <p><b>id : </b>383</p>
     * <p><b>name : </b>mapPut</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static mapPut = <T, U>(_map: Map<T, U>, _key: T, _value: U): U | undefined => { };

    /**
     * <p><b>id : </b>384</p>
     * <p><b>name : </b>mapPutAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapPutAll = <T, U>(_map: Map<T, U>, _elements: Map<T, U>): void => { };

    /**
     * <p><b>id : </b>366</p>
     * <p><b>name : </b>mapRemove</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static mapRemove = <T, U>(_map: Map<T, U>, _key: T): U | undefined => { };

    /**
     * <p><b>id : </b>387</p>
     * <p><b>name : </b>mapRemoveAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapRemoveAll = <T, U>(_map: Map<T, U>, _value: U): void => { };

    /**
     * <p><b>id : </b>385</p>
     * <p><b>name : </b>mapReplace</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static mapReplace = <T, U>(_map: Map<T, U>, _key: T, _value: U): U => { };

    /**
     * <p><b>id : </b>377</p>
     * <p><b>name : </b>mapReplaceAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapReplaceAll = <T, U>(_map1: Map<T, U>, _map2: Map<T, U>): void => { };

    /**
     * <p><b>id : </b>373</p>
     * <p><b>name : </b>mapSearch</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapSearch = <T, U>(_map: Map<T, U>, _value: U): number => { };

    /**
     * <p><b>id : </b>367</p>
     * <p><b>name : </b>mapSize</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static mapSize = <T, U>(_map: Map<T, U>): number => { };

    /**
     * <p><b>id : </b>392</p>
     * <p><b>name : </b>mapSome</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapSome = <T, U>(_map: Map<T, U>, _callback: (arg1: U, arg2: T, arg3: Map<T, U>) => boolean): boolean => { };

    /**
     * <p><b>id : </b>369</p>
     * <p><b>name : </b>mapSum</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapSum = <T, U>(_map: Map<T, U>): number => { };

    /**
     * <p><b>id : </b>379</p>
     * <p><b>name : </b>mapValues</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static mapValues = <T, U>(_map: Map<T, U>): U[] => { };

    /**
     * <p><b>id : </b>223</p>
     * <p><b>name : </b>mark</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>164</p>
     */
        // @ts-ignore
    static mark = (_cells: number | number[], _color?: number, _duration?: number): boolean => { };

    /**
     * <p><b>id : </b>342</p>
     * <p><b>name : </b>markText</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>164</p>
     */
        // @ts-ignore
    static markText = (_cells: number | number[], _text?: string, _color?: number, _duration?: number): boolean => { };

    /**
     * <p><b>id : </b>3</p>
     * <p><b>name : </b>max</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static max = (_a: number, _b: number): number => { };

    /**
     * <p><b>id : </b>2</p>
     * <p><b>name : </b>min</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static min = (_a: number, _b: number): number => { };

    /**
     * <p><b>id : </b>150</p>
     * <p><b>name : </b>moveAwayFrom</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveAwayFrom = (_entity: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>152</p>
     * <p><b>name : </b>moveAwayFromCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveAwayFromCell = (_cell: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>154</p>
     * <p><b>name : </b>moveAwayFromCells</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveAwayFromCells = (_cells: number[], _mp?: number): number => { };

    /**
     * <p><b>id : </b>358</p>
     * <p><b>name : </b>moveAwayFromEntities</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveAwayFromEntities = (_entities: number[], _mp?: number): number => { };

    /**
     * <p><b>id : </b>158</p>
     * <p><b>name : </b>moveAwayFromLine</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveAwayFromLine = (_cell1: number, _cell2: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>142</p>
     * <p><b>name : </b>moveToward</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveToward = (_entity: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>144</p>
     * <p><b>name : </b>moveTowardCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveTowardCell = (_cell: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>148</p>
     * <p><b>name : </b>moveTowardCells</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveTowardCells = (_cells: number[], _mp?: number): number => { };

    /**
     * <p><b>id : </b>356</p>
     * <p><b>name : </b>moveTowardEntities</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveTowardEntities = (_entities: number[], _mp?: number): number => { };

    /**
     * <p><b>id : </b>164</p>
     * <p><b>name : </b>moveTowardLine</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static moveTowardLine = (_cell1: number, _cell2: number, _mp?: number): number => { };

    /**
     * <p><b>id : </b>201</p>
     * <p><b>name : </b>number</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>20</p>
     */
        // @ts-ignore
    static number = (_value: any): number | undefined => { };

    /**
     * <p><b>id : </b>262</p>
     * <p><b>name : </b>pause</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static pause = (): void => { };

    /**
     * <p><b>id : </b>44</p>
     * <p><b>name : </b>pop</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static pop = <T>(_array: T[]): T => { };

    /**
     * <p><b>id : </b>21</p>
     * <p><b>name : </b>pow</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>140</p>
     */
        // @ts-ignore
    static pow = (_base: number, _exp: number): number => { };

    /**
     * <p><b>id : </b>43</p>
     * <p><b>name : </b>push</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static push = <T>(_array: T[], _element: T): void => { };

    /**
     * <p><b>id : </b>64</p>
     * <p><b>name : </b>pushAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static pushAll = <T>(_array: T[], _elements: T[]): void => { };

    /**
     * <p><b>id : </b>22</p>
     * <p><b>name : </b>rand</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static rand = (): number => { };

    /**
     * <p><b>id : </b>23</p>
     * <p><b>name : </b>randInt</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static randInt = (_a: number, _b: number): number => { };

    /**
     * <p><b>id : </b>403</p>
     * <p><b>name : </b>randReal</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static randReal = (_a: number, _b: number): number => { };

    /**
     * <p><b>id : </b>418</p>
     * <p><b>name : </b>realBits</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static realBits = (_x: number): number => { };

    /**
     * <p><b>id : </b>48</p>
     * <p><b>name : </b>remove</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static remove = <T>(_array: T[], _position: number): T => { };

    /**
     * <p><b>id : </b>49</p>
     * <p><b>name : </b>removeElement</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static removeElement = <T>(_array: T[], _element: T): void => { };

    /**
     * <p><b>id : </b>207</p>
     * <p><b>name : </b>removeKey</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>5</p>
     */
        // @ts-ignore
    static removeKey = <T>(_array: T[], _key: number): void => { };

    /**
     * <p><b>id : </b>31</p>
     * <p><b>name : </b>replace</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static replace = (_string: string, _search: string, _replace: string): string => { };

    /**
     * <p><b>id : </b>300</p>
     * <p><b>name : </b>resurrect</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>500</p>
     */
        // @ts-ignore
    static resurrect = (_entity: number, _cell: number): number => { };

    /**
     * <p><b>id : </b>55</p>
     * <p><b>name : </b>reverse</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static reverse = <T>(_array: T[]): void => { };

    /**
     * <p><b>id : </b>414</p>
     * <p><b>name : </b>rotateLeft</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static rotateLeft = (_x: number, _s: number): number => { };

    /**
     * <p><b>id : </b>415</p>
     * <p><b>name : </b>rotateRight</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static rotateRight = (_x: number, _s: number): number => { };

    /**
     * <p><b>id : </b>15</p>
     * <p><b>name : </b>round</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static round = (_number: number): number => { };

    /**
     * <p><b>id : </b>83</p>
     * <p><b>name : </b>say</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static say = (_message: string): void => { };

    /**
     * <p><b>id : </b>53</p>
     * <p><b>name : </b>search</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static search = <T>(_array: T[], _element: T, _start?: number): number => { };

    /**
     * <p><b>id : </b>172</p>
     * <p><b>name : </b>sendAll</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>40</p>
     */
        // @ts-ignore
    static sendAll = (_type: number, _params: any): void => { };

    /**
     * <p><b>id : </b>171</p>
     * <p><b>name : </b>sendTo</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static sendTo = (_entity: number, _type: number, _params: any): boolean => { };

    /**
     * <p><b>id : </b>429</p>
     * <p><b>name : </b>setClear</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static setClear = <T>(_set: Set<T>): Set<T> => { };

    /**
     * <p><b>id : </b>430</p>
     * <p><b>name : </b>setContains</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static setContains = <T>(_set: Set<T>, _element: T): boolean => { };

    /**
     * <p><b>id : </b>436</p>
     * <p><b>name : </b>setDifference</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setDifference = <T>(_set1: Set<T>, _set2: Set<T>): Set<T> => { };

    /**
     * <p><b>id : </b>437</p>
     * <p><b>name : </b>setDisjunction</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setDisjunction = <T>(_set1: Set<T>, _set2: Set<T>): Set<T> => { };

    /**
     * <p><b>id : </b>435</p>
     * <p><b>name : </b>setIntersection</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setIntersection = <T>(_set1: Set<T>, _set2: Set<T>): Set<T> => { };

    /**
     * <p><b>id : </b>432</p>
     * <p><b>name : </b>setIsEmpty</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static setIsEmpty = <T>(_set: Set<T>): boolean => { };

    /**
     * <p><b>id : </b>433</p>
     * <p><b>name : </b>setIsSubsetOf</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setIsSubsetOf = <T>(_set1: Set<T>, _set2: Set<T>): boolean => { };

    /**
     * <p><b>id : </b>425</p>
     * <p><b>name : </b>setPut</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3</p>
     */
        // @ts-ignore
    static setPut = <T>(_set: Set<T>, _element: T): boolean => { };

    /**
     * <p><b>id : </b>278</p>
     * <p><b>name : </b>setRegister</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>50</p>
     */
        // @ts-ignore
    static setRegister = (_key: string, _value: string): boolean => { };

    /**
     * <p><b>id : </b>426</p>
     * <p><b>name : </b>setRemove</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static setRemove = <T>(_set: Set<T>, _element: T): boolean => { };

    /**
     * <p><b>id : </b>431</p>
     * <p><b>name : </b>setSize</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static setSize = (_set: Set<any>): number => { };

    /**
     * <p><b>id : </b>438</p>
     * <p><b>name : </b>setToArray</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setToArray = <T>(_set: Set<T>): T[] => { };

    /**
     * <p><b>id : </b>434</p>
     * <p><b>name : </b>setUnion</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static setUnion = <T>(_set1: Set<T>, _set2: Set<T>): Set<T> => { };

    /**
     * <p><b>id : </b>84</p>
     * <p><b>name : </b>setWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>15</p>
     */
        // @ts-ignore
    static setWeapon = (_weapon: number): void => { };

    /**
     * <p><b>id : </b>46</p>
     * <p><b>name : </b>shift</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static shift = <T>(_array: T[]): T => { };

    /**
     * <p><b>id : </b>238</p>
     * <p><b>name : </b>show</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>8</p>
     */
        // @ts-ignore
    static show = (_cell: number, _color?: number): void => { };

    /**
     * <p><b>id : </b>51</p>
     * <p><b>name : </b>shuffle</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static shuffle = (_array: any[]): void => { };

    /**
     * <p><b>id : </b>26</p>
     * <p><b>name : </b>signum</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>2</p>
     */
        // @ts-ignore
    static signum = (_number: number): number => { };

    /**
     * <p><b>id : </b>5</p>
     * <p><b>name : </b>sin</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static sin = (_angle: number): number => { };

    /**
     * <p><b>id : </b>162</p>
     * <p><b>name : </b>sort</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(nlog(n))</p>
     */
        // @ts-ignore
    static sort = (_array: any[], _order?: number): void => { };

    /**
     * <p><b>id : </b>35</p>
     * <p><b>name : </b>split</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static split = (_string: string, _delimiter: string, _limit?: number): string[] => { };

    /**
     * <p><b>id : </b>16</p>
     * <p><b>name : </b>sqrt</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>8</p>
     */
        // @ts-ignore
    static sqrt = (_number: number): number => { };

    /**
     * <p><b>id : </b>38</p>
     * <p><b>name : </b>startsWith</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static startsWith = (_string: string, _prefix: string): boolean => { };

    /**
     * <p><b>id : </b>202</p>
     * <p><b>name : </b>string</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>8</p>
     */
        // @ts-ignore
    static string = (_value: any): string => { };

    /**
     * <p><b>id : </b>63</p>
     * <p><b>name : </b>subArray</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static subArray = <T>(_array: T[], _start: number, _end: number): T[] => { };

    /**
     * <p><b>id : </b>30</p>
     * <p><b>name : </b>substring</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static substring = (_string: string, _start: number, _length?: number): string => { };

    /**
     * <p><b>id : </b>58</p>
     * <p><b>name : </b>sum</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static sum = (_array: number[]): number => { };

    /**
     * <p><b>id : </b>297</p>
     * <p><b>name : </b>summon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1750</p>
     */
        // @ts-ignore
    static summon = (_chip: number, _cell: number, _ai: (...args: any[]) => void): number => { };

    /**
     * <p><b>id : </b>6</p>
     * <p><b>name : </b>tan</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>30</p>
     */
        // @ts-ignore
    static tan = (_angle: number): number => { };

    /**
     * <p><b>id : </b>11</p>
     * <p><b>name : </b>toDegrees</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static toDegrees = (_radians: number): number => { };

    /**
     * <p><b>id : </b>36</p>
     * <p><b>name : </b>toLower</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static toLower = (_string: string): string => { };

    /**
     * <p><b>id : </b>10</p>
     * <p><b>name : </b>toRadians</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>31</p>
     */
        // @ts-ignore
    static toRadians = (_degrees: number): number => { };

    /**
     * <p><b>id : </b>37</p>
     * <p><b>name : </b>toUpper</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static toUpper = (_string: string): string => { };

    /**
     * <p><b>id : </b>410</p>
     * <p><b>name : </b>trailingZeros</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>1</p>
     */
        // @ts-ignore
    static trailingZeros = (_x: number): number => { };

    /**
     * <p><b>id : </b>226</p>
     * <p><b>name : </b>typeOf</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>8</p>
     */
        // @ts-ignore
    static typeOf = (_value: any): number => { };

    /**
     * <p><b>id : </b>45</p>
     * <p><b>name : </b>unshift</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>complexity : </b>O(n)</p>
     */
        // @ts-ignore
    static unshift = <T>(_array: T[], _element: T): void => { };

    /**
     * <p><b>id : </b>99</p>
     * <p><b>name : </b>useChip</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3000</p>
     */
        // @ts-ignore
    static useChip = (_chip: number, _entity: number): number => { };

    /**
     * <p><b>id : </b>100</p>
     * <p><b>name : </b>useChipOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3000</p>
     */
        // @ts-ignore
    static useChipOnCell = (_chip: number, _cell: number): number => { };

    /**
     * <p><b>id : </b>91</p>
     * <p><b>name : </b>useWeapon</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3000</p>
     */
        // @ts-ignore
    static useWeapon = (_entity: number): number => { };

    /**
     * <p><b>id : </b>92</p>
     * <p><b>name : </b>useWeaponOnCell</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>3000</p>
     */
        // @ts-ignore
    static useWeaponOnCell = (_cell: number): number => { };

    /**
     * <p><b>id : </b>314</p>
     * <p><b>name : </b>weaponNeedLos</p>
     * <p><b>description : </b>TODO</p>
     * <p><b>operations : </b>10</p>
     */
        // @ts-ignore
    static weaponNeedLos = (_weapon?: number): boolean => { };
}
