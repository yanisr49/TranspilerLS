import 'dotenv/config';
import {Transpiler} from './transpiler/transpiler/transpiler';

export const main = async () => {
    const transpiler = new Transpiler();
    await transpiler.initAPI();
    await transpiler.initData();

    /*
    if (!process.env.DIR_NAME) {
        throw new Error("Veuillez spécifier un nom de dossier dans le fichier d'environment");
    }
    if (!process.env.TS_CONFIG_PATH) {
        throw new Error("Veuillez spécifier le chemin absolu du fichier tsconfig.json dans le fichier d'environment");
    }
    if (!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        throw new Error("Veuillez spécifier le chemin absolut du dossier contenant les sources à transpiler dans le fichier d'environment");
    }

    const api: API = new API();
    await api.login();
    await api.setInterceptor();

    const sourceFolder = await initData(api);

    let actions: Action[] = [];

    const processDebouncedActions = debounce(async () => {
        await updateModifications(api, actions, sourceFolder);
        actions = [];
    }, 250);

    const watcher = chokidar.watch(process.env.ABSOLUTE_PATH_TO_SOURCES, {
        ignored: /(^|[/\\])\../, // ignore dotfiles
        persistent: true,
    });

    let isInitialScan = true;

    console.log('Wait half a second !');
    setTimeout(() => {
        isInitialScan = false;
    }, 500);
    console.log("I'm listening !");

    watcher.on('all', (event, path) => {
        if (!isInitialScan) {
            checkModification(event, path, actions);
            processDebouncedActions();
        }
    });
    */
};

main().then();
