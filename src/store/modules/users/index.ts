/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { Module }     from 'vuex';
import { getters }    from './getters';
import actions        from './actions';
import mutations      from './mutations';
import { IState }     from './types';
import { RootState }  from '../../types';

export const state: IState = {
  users: [],
};

const namespaced: boolean = true;

export const users: Module<IState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
