/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { MutationTree }       from 'vuex';
import { RepositoriesState }  from './types';

const mutations: MutationTree<RepositoriesState> = {
  ADD_REPOSITORY(state, repo) {
    // state.repositories.unshift(repo);
  },
  REMOVE_REPOSITORY(state, index) {
    state.repositories.splice(index, 1);
  },
  FETCH_REPOSITORIES(state, repositories) {
    state.repositories = repositories;
  },
};

export default mutations;
