# TranspilerLS
## Comment écrire son code LeekScript
Le point d'entrée est le fichier [src/editor/main.ts](https://github.com/yanisr49/TranspilerLS/blob/master/src/editor/main.ts), 
le langage à utiliser est Typescript et il est possible de créer autant de fichier que l'on souhaite, ils seront tous 
concaténés lors de la transpilation en se basant sur les imports dans chaque fichier.

Une fois votre code écrit, utiliser la commande `npm run start:dev`

## Informations générales
Tous les fichiers créés dans le dossier [src/editor/globaux/](https://github.com/yanisr49/TranspilerLS/tree/master/src/editor/globaux) 
seront ignorés lors de la transpilation.A l'exception du fichier 
[src/editor/enums.ts](https://github.com/yanisr49/TranspilerLS/blob/master/src/editor/globaux/enums.ts) qui répertorie toutes les
énumérations souhaitées.

Les constants et les fonctions propres à LeekWars sont toutes référencées dans le dossier 
[globaux](https://github.com/yanisr49/TranspilerLS/tree/master/src/editor/globaux), il est possible de les consulter 
en utilisant la complétion automatique de votre IDE préféré. (IDE conseillé : intelliJ).

Pour utiliser une fonction : `LS.abs(1)`.

Pour utiliser une constante : `LS.AREA_CIRCLE_1`.


## Variables d'environment
Le fichier .env référence les variables d'environment nécessaire au bon fonctionnement du programme :
 - **LOGIN** : Identifiant de connexion au compte LeekWars
 - **PASSWORD** : Mot de passe de connexion au compte LeekWars
 - **FILE_NAME** : Nom du fichier IA LeekWars où sera sauvegarder le code *(NB : le fichier doit déjà exister)*
 - **ENABLE_SAVE** : 1 si l'on souhaite que le code soit sauvegarder sur LeekWars, 0 si l'on veut juste afficher le résultat
de la transpilation dans la console
 - **ABSOLUTE_PATH_TO_SOURCES** : Chemin absolue vers le fichier main.js
 - **PRINT_TO_CONSOLE** : 1 pour afficher le code transpiler dans la console, 0 sinon

## Transpilation
### Types
Le typage en Typescript s'effectue de la manière suivante `const var: number;` en `const var;` ce typage est transformé en prenant 
tout ce qui correspond à `x: xxxxxx` en `x` : le dernier caractère du nom de la variable collé au `:` est pris en compte pour
ignorer une ternaire qui aurait la même syntaxe mais avec un espace avant le `:`.

Transformation du constructeur de Map `new Map<xxx, xxx>` en `[:]`;

### Interval
Transforme la syntax `[...Array(612).keys()]` en `[0..612]`

### Mapping de mots-clés
Mapping des mots-clés :
 - `abstract ` en ` `
 - `const ` en `var `
 - `let ` en `var `
 - `export var ` en `global `
 - `export ` en ` `
 - `===` en `==`
 - `!==` en `!=`

### Mapping de la boucle for..in
Transforme la snytaxe `for (var i of xxx) {` en `for (var i in xxx) {`

### Mapping de la methode push
Transforme la snytaxe `xxx.push(` en `push(xxx`

### Template literals
Transforme la snytaxe `` `xxx` `` en ` "xxx" `.

Transforme la syntaxe `${xxx}` en `" + xxx + "` dans un template literals.
*NB : ne fonctionne que pour les Template literals sur une seule ligne*

Ce qui donnerait par exemple : `` `bar ${foo}` `` en `"bar " + foo + ""`

### Console.log
Tranforme la syntaxe `console.log(xxx, xxx, xxx)` en `debug(xxx + ", " + xxx + ", " + xxx)`
*NB : ne fonctionne que pour les `console.log` sur une seule ligne*

### Enumérations
Toutes les énumérations présentes dans le fichier [src/editor/enums.ts](https://github.com/yanisr49/TranspilerLS/blob/master/src/editor/globaux/enums.ts)
sont récupérées et sont rajoutées au début du fichier principal. 

Example : 
```
export enum CELL_TYPE {
    EMPTY_CELL,
    OBSTACLE_CELL,
    VOID_CELL
}
```
est transformé en 
```
global CELL_TYPE_VOID_CELL = 2;
global CELL_TYPE_OBSTACLE_CELL = 1;
global CELL_TYPE_EMPTY_CELL = 0;
```

et ensuite lors de leur utilisation : `public type = CELL_TYPE.EMPTY_CELL;` est transformé en `public type = CELL_TYPE_OBSTACLE_CELL;`
