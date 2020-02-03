/**
 * Copyright (c) 2020 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

/* eslint-disable no-underscore-dangle */

import { remote }                  from 'electron';
import { resolve as pathResolve }  from 'path';
import git                         from './core';

declare const __static: string;
const config = () => ({
  setGlobalConfigValue: (name: string, value: string): Promise<any> => ((
    new Promise(async (resolve, reject) => {
      const options = { env: { HOME: remote.app.getPath('home') } };

      const dugitePath = pathResolve(
        __static,
        'git',
      );

      try {
        await git(
          ['config', '--global', '--replace-all', name, value],
          dugitePath,
          'setGlobalConfigValue',
          options,
        );
        resolve('SUCCESS');
      } catch (error) {
        reject(new Error(error));
      }
    })
  )),
});

export default config;
