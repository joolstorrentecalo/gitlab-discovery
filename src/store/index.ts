/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import Vue              from 'vue';
import Vuex             from 'vuex';
import { RootState }    from './types';

// Modules
import { users }        from './modules/users';
import { repositories } from './modules/repositories';
import getters          from './getters';
import actions          from './actions';
import mutations        from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store<RootState>({
  getters,
  actions,
  mutations,
  state: {
    user: {
      name: '',
      email: '',
      avatar_url: '',
    },
    theme: 0,
    lastCloneLocation: '',
    idUser: 0,
    signUpProgress: 0,
    initialConfig: undefined,
  },
  modules: {
    users,
    repositories,
  },
});

store.dispatch('INIT');
export default store;
