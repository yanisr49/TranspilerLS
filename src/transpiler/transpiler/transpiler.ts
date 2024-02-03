import path from 'path';
import ts from 'typescript';
import API from '../lsCommunications/request';
import {File, Folder} from '../lsCommunications/treeStructure';
import * as fs from 'fs';
import {tokenMapper} from './mapper/tokenMapping';
import {typeMapper} from './mapper/typeMapping';
import {declarationMapper} from './mapper/declarationMapping';
import {expressionMapper} from './mapper/expressionMapping';
import {classMapper} from './mapper/classMapping';
import {statementMapper} from './mapper/statementMapping';
import {leftoversMapper} from './mapper/leftoversMapper';
import {getKind} from './utils/utils';
import chokidar from 'chokidar';
import {debounce} from 'lodash';

interface Action {
    filename: string;
    action: 'save' | 'unlink' | 'unlinkDir';
}

export class Transpiler {
    private readonly basePath: string;
    private readonly tsconfigPath: string;
    private readonly dirname: string = process.env.DIR_NAME!;
    private sourcesPath!: string;
    private sourcesFiles: string[] = [];
    private program?: ts.Program;
    private typeChecker?: ts.TypeChecker;
    private api: API;
    private sourceFolder!: Folder;
    private actions: Action[] = [];

    constructor() {
        if (!this.dirname) {
            throw new Error("La variable d'environment ne peut pas être vide");
        }

        // this.basePath = path.normalize('C:\\Users\\yanis\\IdeaProjects\\EditorLS');
        this.basePath = path.normalize(__dirname).split('\\node_modules')[0]; // node_modules
        this.tsconfigPath = path.join(this.basePath, 'tsconfig.json');

        this.api = new API();
    }

    public async initAPI() {
        await this.api.login();
        await this.api.setInterceptor();
    }

    private createTranspilerProgram() {
        // Read the TypeScript configuration file
        const config = ts.readConfigFile(this.tsconfigPath, ts.sys.readFile).config;

        // Parse the configuration to get file names, options and project references
        const parseConfigHost: ts.ParseConfigFileHost = {
            useCaseSensitiveFileNames: true,
            readDirectory: ts.sys.readDirectory,
            fileExists: ts.sys.fileExists,
            readFile: ts.sys.readFile,
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            onUnRecoverableConfigFileDiagnostic: console.error,
        };
        const parsedConfig = ts.parseJsonConfigFileContent(config, parseConfigHost, this.basePath);

        if (!config.compilerOptions.rootDir) {
            throw new Error('le champ rootDir dans le fichier tsconfig.json doit être rempli !');
        }
        this.sourcesPath = path.join(this.basePath, config.compilerOptions.rootDir);

        this.sourcesFiles.push(...parsedConfig.fileNames.map(p => path.normalize(p).slice(this.sourcesPath.length + 1)));

        this.program = ts.createProgram({
            rootNames: parsedConfig.fileNames,
            options: parsedConfig.options,
            projectReferences: parsedConfig.projectReferences,
        });
        this.typeChecker = this.program.getTypeChecker();
    }

    public async initData() {
        this.createTranspilerProgram();
        await this.initTreeStructure();
        this.updateTreeStructureToBeCreated(this.sourcesFiles);
        await this.updateTreeStructure();
        await this.generateRunFile();
    }

    private async updateTreeStructure() {
        for (const fileFolder of this.sourceFolder.getFileFolderToBeSaved()) {
            if (fileFolder instanceof File) {
                if (fileFolder.toBeCreated) {
                    await this.api.createFile(fileFolder);
                    fileFolder.toBeCreated = false;
                }
                await this.api.saveFile(fileFolder, this.transpile(fileFolder));
                fileFolder.toBeSaved = false;
            } else if (fileFolder instanceof Folder) {
                if (fileFolder.toBeCreated) {
                    await this.api.createFolder(fileFolder);
                    fileFolder.toBeCreated = false;
                }
            }
        }

        for (const fileFolder of this.sourceFolder.getFileFolderToBeDeleted()) {
            if (fileFolder instanceof File) {
                if (fileFolder.toBeDeleted && (fileFolder.parentFolder !== this.sourceFolder || fileFolder.name !== 'run')) {
                    await this.api.deleteFile(fileFolder);
                    fileFolder.parentFolder!.ais = fileFolder.parentFolder!.ais.filter(ai => ai !== fileFolder);
                }
            } else if (fileFolder instanceof Folder) {
                if (fileFolder.toBeDeleted) {
                    await this.api.deleteFolder(fileFolder);
                    fileFolder.parentFolder!.folders = fileFolder.parentFolder!.folders.filter(folder => folder !== fileFolder);
                }
            }
        }
    }

    private async initTreeStructure() {
        const data = await this.api.getTreeStructure();

        const rootDir = data.folders.find(f => f.name === this.dirname && f.folder === 0);

        if (rootDir) {
            this.sourceFolder = new Folder(rootDir.id, rootDir.name, false, false, undefined);
            this.sourceFolder.constructTree(data);
        } else {
            this.sourceFolder = new Folder(undefined, this.dirname, true, false, undefined);
        }
    }

    private updateTreeStructureToBeCreated(fileFolderToBeCreated: string[]) {
        for (const sourceFile of fileFolderToBeCreated) {
            if (sourceFile.endsWith('\\ls.ts')) {
                continue;
            }
            const pathParts = sourceFile.split('\\');

            if (fs.statSync(this.getFullPath(sourceFile)).isFile()) {
                this.sourceFolder.updateTreeStructureFileToBeSaved(pathParts);
            } else if (fs.statSync(this.getFullPath(sourceFile)).isDirectory()) {
                this.sourceFolder.updateTreeStructureDirToBeSaved(pathParts);
            }
        }
    }

    private updateTreeStructureToBeDeleted(fileFolderToBeDeleted: string[]) {
        fileFolderToBeDeleted.forEach(sourceFile => {
            const pathParts = sourceFile.split('\\');
            this.sourceFolder.updateTreeStructureFolderFileToBeDeleted(pathParts);
        });
    }

    private getFullPath(sourcefilePath: string) {
        return path.join(this.sourcesPath, sourcefilePath);
    }

    private transpile(file: File) {
        const absolutePath = path.join(this.sourcesPath, file.getPath());
        const sourceFile = this.program!.getSourceFiles().find(sf => path.normalize(sf.fileName) === absolutePath);

        if (!sourceFile) {
            console.log('empty file !');
            return '';
        }

        console.log(sourceFile?.fileName);

        const visitNode = (node: ts.Node): string => {
            if (node?.getText()?.includes("ole.log(fieldName, 'izizi")) {
                //console.log(getKind(node), node.getText());
            }

            let result: string | undefined;

            for (const func of [tokenMapper, typeMapper, declarationMapper, expressionMapper, classMapper, statementMapper, leftoversMapper]) {
                result = func(node, sourceFile!, visitNode, this.typeChecker!);
                if (result !== undefined) {
                    break;
                }
            }

            if (result === undefined) {
                console.log(`TODO\n\t${getKind(node)} ===> ${node.getText()}\nFIN TODO`);
            }
            return result ?? `TODO\n\t${getKind(node)} ===> ${node.getText()}\nFIN TODO`;
        };

        return sourceFile!.statements.map(visitNode).join('');
    }

    public watch() {
        const watcher = chokidar.watch(this.sourcesPath, {
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
                this.checkModification(event, path, this.actions);
                this.processDebouncedActions();
            }
        });
    }

    private processDebouncedActions = debounce(async () => {
        await this.updateModifications();
        this.actions = [];
    }, 250);

    private checkModification(event: any, path: string, actions: Action[]) {
        let action: Action | undefined;
        switch (event) {
            case 'add':
            case 'change':
                action = actions.find(a => a.filename === path);
                if (action) {
                    action.action = 'save';
                } else {
                    actions.push({filename: path, action: 'save'});
                }
                break;
            case 'unlink':
                if (actions.some(a => path.startsWith(a.filename) && path !== a.filename)) {
                    break;
                }
                action = actions.find(a => a.filename === path);
                if (action) {
                    action.action = 'unlink';
                } else {
                    actions.push({filename: path, action: 'unlink'});
                }
                break;
            case 'unlinkDir':
                actions = actions.filter(a => !a.filename.startsWith(path));

                action = actions.find(a => a.filename === path);
                if (action) {
                    action.action = 'unlinkDir';
                } else {
                    actions.push({filename: path, action: 'unlinkDir'});
                }
                break;
        }

        return actions;
    }

    private async updateModifications() {
        const pathToBeSaved = this.actions.filter(action => action.action === 'save').map(action => action.filename.slice(this.sourcesPath.length + 1));
        this.updateTreeStructureToBeCreated(pathToBeSaved);

        const pathToBeDeleted = this.actions.filter(action => action.action !== 'save').map(action => action.filename.slice(this.sourcesPath.length + 1));
        this.updateTreeStructureToBeDeleted(pathToBeDeleted);

        this.createTranspilerProgram();
        await this.updateTreeStructure();

        await this.generateRunFile();
    }

    private async generateRunFile() {
        let runFile = this.sourceFolder.ais.find(ai => ai.name === 'run');
        if (!runFile) {
            runFile = new File(undefined, 'run', false, false, false, this.sourceFolder);
            await this.api.createFile(runFile);
            this.sourceFolder.ais.push(runFile);
        }

        const code = this.sourceFolder
            .getAllFilesPath()
            .filter(fp => fp !== 'run')
            .map(fp => `include('${fp.replaceAll('\\', '/')}');`)
            .join('\n');

        await this.api.saveFile(runFile, code);
    }
}
