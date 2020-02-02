/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { GetterTree } from 'vuex';
import { RootState }  from './types';

const getters: GetterTree<RootState, any> = {
  idUser: (state): number => state.idUser,
  signUpProgress: (state): number => state.signUpProgress,
  user: (state): any => state.user,
};

export default getters;
