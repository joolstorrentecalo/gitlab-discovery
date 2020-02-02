/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { ActionTree } from 'vuex';
import { RootState } from './types';
// import Log            from '../lib/log';

const DB_INIT = [
  'users/INIT',
  'repositories/INIT',
];

const actions: ActionTree<RootState, any> = {
  INIT(context) {
    context.dispatch('LOAD_CONFIG');
    context.dispatch('LOAD_DB');
    // tslint:disable-next-line: no-console
    // Log.info('Store', 'Database init...');
  },
  LOAD_CONFIG({ commit }) {
    const config = {
      user: localStorage.getItem('user'),
      idUser: localStorage.getItem('id_user'),
      theme: localStorage.getItem('theme') || 0, // 0 is the default light theme
      lastCloneLocation: localStorage.getItem('last_clone_location'),
      signUpProgress: localStorage.getItem('sign_up_progress') || 0,
      initialConfig: localStorage.getItem('initial_config') || undefined,
    };
    commit('SET_CONFIG', config);
  },
  LOAD_DB(context) {
    DB_INIT.forEach(action => context.dispatch(action));
  },
  UPDATE_SIGNUP_PROGRESS({ commit }) {
    commit('UPDATE_SIGNUP_PROGRESS');
  },
  FINISH_INITIAL_CONFIG({ commit }) {
    commit('FINISH_INITIAL_CONFIG');
  },
};

export default actions;
