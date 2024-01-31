import 'dotenv/config';
import {Transpiler} from './transpiler/transpiler/transpiler';

export const main = async () => {
    const transpiler = new Transpiler();
    await transpiler.initAPI();
    await transpiler.initData();

    transpiler.watch();
};

main().then();
