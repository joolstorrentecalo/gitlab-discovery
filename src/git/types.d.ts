/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
import Config from './config';

// Types
type IConfig = ReturnType<typeof Config>;

declare class Git {
  config: IConfig;
}


// Declare module with Vue interface as our plugin
declare module 'vue/types/vue' {
  interface Vue {
      $git: Git;
  }
}
