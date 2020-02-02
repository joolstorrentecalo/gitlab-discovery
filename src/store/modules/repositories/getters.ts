/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { GetterTree }         from 'vuex';
import { RepositoriesState }  from './types';
import { RootState }          from '../../types';

const getters: GetterTree<RepositoriesState, RootState> = {
  projects: state => state.repositories,
};

export default getters;
