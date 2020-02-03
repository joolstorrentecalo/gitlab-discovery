/**
 * Copyright (c) 2020 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { GitProcess }           from 'dugite';
import { IGitExecutionOptions } from './interface';

/**
 * A shell for interact with Git
 * @param args  - The Arguments to pass to `git`.
 * @param path  - The working directory path for the execution of the command.
 * @param name  - The name for the command based on its caller's context.
 * This will be used for performance measurements and debugging.
 */

export default function git(
  args: string[],
  path: string,
  name: string,
  options?: IGitExecutionOptions,
) {
  return new Promise(async (resolve, reject) => {
    const defaultOptions: IGitExecutionOptions = {
      successExitCodes: new Set([0]),
      expectedErrors: new Set(),
    };

    const opts = { ...defaultOptions, ...options };

    const commandName = `${name}: git ${args.join(' ')}`;
    console.log(commandName);

    const result = await GitProcess.exec(args, path, opts);

    if (result.exitCode === 0) {
      return resolve('SUCCESS');
    }
    console.log(result.stderr);
    return reject(new Error(result.stderr));
  });
}
