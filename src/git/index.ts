/**
 * Copyright (c) 2020 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

/* eslint-disable no-param-reassign */
import _Vue from 'vue';
import { Store }        from 'vuex';
import { RootState }    from '../store/types';
import Api              from './api';

// Set plugin function as exported
export default function myPlugin(Vue: typeof _Vue, vuex: Store<RootState>): void {
  // Declare $git inside Vue as global variable
  Vue.prototype.$git = Api(vuex);
}
