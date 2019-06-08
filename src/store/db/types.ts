/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

export interface IRepositories {
  id: string;
  gitLabRepositoryID: number;
  name: string;
  path: string;
  created_at: string;
  updated_at: string;
}

export interface IUsers {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
  id_gitlab: string;
  token: string;
  created_at: string;
  updated_at: string;
}
