/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { MutationTree } from 'vuex';
import { RootState }    from './types';

const mutations: MutationTree<RootState> = {
  SET_CONFIG(state, config) {
    if (config.user) {
      state.user = JSON.parse(config.user);
    }
    state.idUser = config.idUser;
    state.theme = config.theme;
    state.lastCloneLocation = config.lastCloneLocation;
    state.signUpProgress = config.signUpProgress;
  },
  UPDATE_SIGNUP_PROGRESS(state: RootState) {
    const newProgress: number = Number(state.signUpProgress) + 1;
    state.signUpProgress = newProgress;
    localStorage.setItem('sign_up_progress', String(newProgress));
  },
  FINISH_INITIAL_CONFIG(state: RootState) {
    state.initialConfig = 'complete';
    localStorage.setItem('initial_config', 'complete');
  },
};

export default mutations;
