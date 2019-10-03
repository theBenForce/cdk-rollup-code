import { RollupOptions, rollup } from 'rollup';
import { Code } from "@aws-cdk/aws-lambda";
import * as tmp from "tmp";

import { join as joinPath } from "path";

/**
 * Writes rollup results to a temporary directory, then
 * returns a @Code instance referencing that directory.
 */
export default async function RollupCode(codePath: string, config: RollupOptions): Promise<Code> {
    const bundle = await rollup({ ...config, input: codePath });

    // Create tmp directory
    const tmpDir = tmp.dirSync();

    await bundle.write({ ...config.output, file: joinPath(tmpDir.name, 'index.js') });

    return Code.fromAsset(tmpDir.name);
}
