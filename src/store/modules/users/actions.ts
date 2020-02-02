/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// tslint:disable function-name

import { ActionTree }     from 'vuex';
import { IState, IUser }  from './types';
import { RootState }      from '../../types';
import { db }             from '../../db';
// import Log                from '../../../lib/log';

const actions: ActionTree<IState, RootState> = {
  INIT(context) {
    context.dispatch('FETCH_USERS');
  },
  async FETCH_USERS({ commit }) {
    const users = await db.users
      .orderBy('created_at')
      .reverse()
      .toArray();

    commit('FETCH_USERS', users);
  },
  async ADD_USER(context, user: IUser) {
    let id: number;
    const newUser = user;
    newUser.created_at = new Date().toISOString();
    newUser.updated_at = '';

    try {
      id = await db.users.add(newUser);
      localStorage.setItem('id_user', id.toString());
      context.commit('ADD_USER', newUser);
      context.dispatch('INIT', null, { root: true });
      context.dispatch('UPDATE_SIGNUP_PROGRESS', null, { root: true });
      // Log.info('Store action', `User added ${id}`);
    } catch (err) {
      // Log.error('Store action', 'Oops, failed to add user');
      // Log.error('Store action', err);
    }
  },
};

export default actions;
