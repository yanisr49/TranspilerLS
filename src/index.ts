import 'dotenv/config';
import API from './transpiler/lsCommunications/request';
import {Action, checkModification, initData, updateModifications} from './transpiler/transpiler/transpiler';
import {debounce} from 'lodash';
import chokidar from 'chokidar';

const main = async () => {
    if (!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        throw Error('Aïe Aïe Aïe');
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
};

main().then();
