/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { MutationTree }   from 'vuex';
import { IState, IUser }  from './types';
// import Log                from '../../../lib/log';

const mutations: MutationTree<IState> = {
  FETCH_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, user: IUser) {
    state.users.unshift(user);
    localStorage.setItem('user', JSON.stringify(user));
    // Log.info('Vuex', `adding account (${user.login} ${user.name}) to Store`);
  },
  REMOVE_USER(state, index: number) {
    state.users.splice(index, 1);
  },
};

export default mutations;
