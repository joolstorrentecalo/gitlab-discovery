/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { Module }            from 'vuex';
import  getters              from './getters';
import  actions              from './actions';
import  mutations            from './mutations';
import { RepositoriesState } from './types';
import { RootState }         from '../../types';

export const state: RepositoriesState = {
  repositories: [],
};

const namespaced: boolean = true;

export const repositories: Module<RepositoriesState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
