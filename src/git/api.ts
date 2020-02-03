/**
 * Copyright (c) 2020 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

// import
import { Store }        from 'vuex';
import { RootState }    from '../store/types';
import Config           from './config';

const Api = (store: Store<RootState>) => ({
  config: Config(),
});

export default Api;
