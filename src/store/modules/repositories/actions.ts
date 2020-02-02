/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { ActionTree }         from 'vuex';
import { RepositoriesState }  from './types';
import { RootState }          from '../../types';
import { db }                 from '../../db';
// import Log                    from '../../../lib/log';

const actions: ActionTree<RepositoriesState, RootState> = {
  INIT(context) {
    context.dispatch('FETCH_REPOSITORIES');
  },
  async FETCH_REPOSITORIES({ commit }) {
    const repositories = await db.repositories;
    commit('FETCH_REPOSITORIES', repositories);
  },
  async ADD_REPOSITORY({ commit }, repo) {
    let id;
    try {
      id = await db.repositories.add(repo);
    } catch (err) {
      // Log.error('Store action', 'Oops, failed to add repository');
      // Log.error('Store action', err);
    }

    commit('ADD_REPOSITORY', repo);
    // Log.info('Store action', `Repository added ${id}`);
  },
};

export default actions;
