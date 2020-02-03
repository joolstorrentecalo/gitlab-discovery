<!--
 Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 Use of this source code is governed by a BSD-style license that can be
 found in the LICENSE file.
-->

<template>
  <div class="welcome">
    <div class="form">
      <div class="d-flex h-100 align-items-center text-left">
        <div
          v-show="signUpProgress == 0"
          class="full p-4 px-6"
        >
          <h2>{{ this.$i18n.t('welcome_title') }}</h2>
          <span class="py-4 d-block">{{ this.$i18n.t('welcome_about') }}</span>
          <div class="divider" />
          <span class="py-2 d-block">
            {{ this.$i18n.t('new_question') }}
            <a
              href="#"
              class="a"
              @click="openLink('https://gitlab.com/users/sign_in#register-pane')"
            >{{ this.$i18n.t('create_account') }}</a>.
          </span>
          <a
            class="d-inline-block py-2"
            href="#"
            @click="sign()"
          >{{ this.$i18n.t('sign_in_gitlab') }}</a>
        </div>

        <div
          v-show="signUpProgress == 1"
          class="full p-4 px-6"
        >
          <h2>{{ this.$i18n.t('sign_in_title') }}</h2>
          <span class="py-2">{{ this.$i18n.t('welcome_insert_infos') }}</span>

          <GlFormInput
            v-model="token"
            class="d-block my-2"
            type="text"
            :placeholder="this.$i18n.t('access_token')"
          />
          <small
            v-if="errorToken == true"
            class="d-block mt-1 text-danger"
          >{{ this.$i18n.t('invalid_token_message') }}</small>
          <GlButton
            class="d-inline-block my-3"
            :disabled="token == ''"
            variant="success"
            @click="addUser"
          >
            {{ this.$i18n.t('sign_in_title') }}
          </GlButton>
        </div>

        <div
          v-if="signUpProgress == 2"
          class="full p-4 px-6"
        >
          <h2>{{ this.$i18n.t('configure_git_title') }}</h2>
          <span class="py-2 mb-3 d-block">{{ this.$i18n.t('configure_git_desc') }}</span>
          <span class="d-block my-2">Name</span>
          <GlFormInput
            v-model="gitlabUserName"
            class="d-block my-2"
            placeholder="Your name"
            type="text"
          />
          <span class="d-block my-2">Email</span>
          <GlFormInput
            v-model="gitlabUserEmail"
            class="d-block my-2"
            placeholder="Your email"
            type="text"
          />
          <div class="d-block my-3">
            <GlButton
              class="d-inline-block my-3"
              @click="backStep(0)"
            >
              Cancel
            </GlButton>
            <GlButton
              class="d-inline-block ml-2 my-3"
              variant="success"
              @click="setGitConfig"
            >
              Next
            </GlButton>
          </div>

          <div class="example-commit">
            <small class="example-commit-header">{{ this.$i18n.t('example_commit') }}</small>
            <div class="example-commit-container">
              <small class="example-commit-title">{{ this.$i18n.t('example_commit_title') }}</small>
              <div>
                <img
                  class="example-commit-avatar"
                  :src="user.avatar_url + '?private_token=' + user.token"
                >
                <small class="example-commit-username">{{ gitlabUserName }}</small>
                <small class="example-commit-time">{{ this.$i18n.t('example_commit_time') }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-useless-escape */

import { Component, Vue }       from 'vue-property-decorator';
import { shell }                from 'electron';
import { Getter, Action }       from 'vuex-class';
// import Log                      from  '../lib/log';
import { GlFormInput, GlButton } from '@gitlab/ui';
import { Gitlab }               from 'gitlab';
// import { setGlobalConfigValue } from '../lib/git';
// import router                   from '../router';

@Component({
  components: {
    GlFormInput,
    GlButton,
  },
})
export default class Welcome extends Vue {
  // Getters
  @Getter('idUser') private currentUser!: number;

  @Getter('user') private user!: any;

  @Getter('signUpProgress') private signUpProgress!: number;

  // Actions
  @Action('users/ADD_USER') private ADD_USER: any;

  @Action('UPDATE_SIGNUP_PROGRESS') private NEXT_WINDOW: any;

  @Action('FINISH_INITIAL_CONFIG') private finish: any;

  // Data property
  private token!: string;

  private email!: string;

  private nameUser!: string;

  private errorEmail!: boolean;

  private errorNameUser!: boolean;

  private errorToken!: boolean;

  private gitlabUserName!: string;

  private gitlabUserEmail!: string;

  private currentWindow!: string;

  private getUser!: boolean;

  private step!: number;

  constructor() {
    super();
    this.currentWindow = 'welcome';
    this.token = '';
    this.gitlabUserName = '';
    this.gitlabUserEmail = '';
    this.errorToken = false;
    this.getUser = false;
  }

  // Lifecycle hook
  private mounted() {
    this.gitlabUserName = this.user.name;
    this.gitlabUserEmail = this.user.email;
  }

  private sign() {
    this.NEXT_WINDOW();
  }

  private openLink(url: string): void {
    shell.openExternal(url);
  }

  private addUser(): void {
    if (this.getUser) {
      return;
    }
    // tslint:disable-next-line
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.errorToken = false;

    if (this.token === '') {
      this.errorToken = true;
      return;
    }
    this.getGitlabConn();
  }

  private getGitlabConn() {
    this.getUser = true;
    const gitlab = new Gitlab({
      token: this.token, // Can be created in your profile.
    });

    gitlab.Users.current()
      .then((data: any) => {
        this.ADD_USER({
          login: data.username,
          name: data.name,
          avatar_url: data.avatar_url,
          email: data.email,
          id_gitlab: data.id,
          token: this.token,
        });
        this.gitlabUserName = data.name;
        this.gitlabUserEmail = data.email;
        this.getUser = false;
      });
  }

  private backStep(step: number) {
    this.step = step;
    this.gitlabUserName = '';
    this.gitlabUserEmail = '';
  }

  private setGitConfig() {
    const config = [
      this.$git.config.setGlobalConfigValue('user.email', this.gitlabUserEmail),
      this.$git.config.setGlobalConfigValue('user.name', this.gitlabUserName),
    ];

    // Go to home app.
    Promise.all(config).then(() => {
      this.finish();
      this.$router.push('/home');
    });
  }
}
</script>

<style lang="scss">
// @import '../assets/nuiverse/utils/_variables';

.welcome {
  &::before {
    background-image: url('../assets/gitlab-icon-pattern-header.svg');
    background-size: cover;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  &::after {
    background-color: #548;
    bottom: 0;
    content: '';
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 0;
  }

  .form {
    background-color: rgba(255, 255, 255, 0.75);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 2;
  }

  .form-container {
    height: 100%;
    padding: 0 10%;
  }

  .divider {
    background-color: #e6e6e6;
    border-radius: 20px;
    display: block;
    height: 4px;
    margin: 10px 0;
    width: 20%;
  }

  .example-commit {
    background-color: #fff;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 4px;
    margin-top: 30px;
    overflow: hidden;

    .example-commit-header {
      background-color: #efefef;
      color: rgb(32, 32, 32);
      display: block;
      padding: 6px 10px;
    }

    .example-commit-container {
      padding: 6px 10px;
    }

    .example-commit-title {
      display: block;
      font-weight: bold;
    }

    .example-commit-username,
    .example-commit-time {
      color: rgb(85, 85, 85);
    }

    .example-commit-avatar {
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      vertical-align: middle;
      width: 25px;
    }
  }
}

.signin-btn {
  .progress {
    display: none;
  }
}

// .disabled {
//   background-color: rgba($primary, 0.3);
//   border-color: rgba($primary, 0.3);

//   &.loading .progress {
//     bottom: 4px;
//     display: block;
//     height: 2px;
//     left: 0;
//     margin: 0 9px;
//     position: absolute;
//     width: calc(100% - 20px);
//   }
// }
</style>
