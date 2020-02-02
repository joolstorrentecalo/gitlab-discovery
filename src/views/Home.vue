<template>
  <div class="home w-100 h-100 overflow-hidden">
    <div
      class="no-projects-found w-100 h-100
      d-flex flex-column align-items-center
      justify-content-center overflow-hidden"
    >
      <div class="d-block">
        <img
          class="d-block mx-auto"
          src="../assets/illustrations/operations_metrics_empty.svg"
        >
        <strong class="d-block mx-auto text-center mt-4 mb-2">No projects found</strong>
      </div>

      <div class="d-flex justify-content-center align-items-stretch">
        <!-- Create project -->
        <div class="start-actions p-3 d-flex flex-column">
          <img
            class="mx-auto"
            src="../assets/illustrations/welcome/add_new_project.svg"
          >
          <span class="text-center my-2">
            Create a new project and publish it to GitLab.
          </span>
          <div>
            <GlButton class="mx-auto d-block my-3">Create a new project</GlButton>
          </div>
        </div>

        <!-- Add a local project -->
        <div class="start-actions p-3 d-flex flex-column">
          <img
            class="mx-auto"
            src="../assets/illustrations/profile-page/personal-projects.svg"
          >
          <span class="text-center my-2">
            Add an existing project on your computer and publish it to GitLab.
          </span>
          <div>
            <GlButton class="mx-auto d-block my-3">
              Add a local project
            </GlButton>
          </div>
        </div>

        <!-- Clone a project -->
        <div class="start-actions p-3 d-flex flex-column">
          <img
            class="mx-auto"
            src="../assets/illustrations/profile-page/personal-project.svg"
          >
          <span class="text-center my-2">
            Clone an existing project from GitLab to your computer.
          </span>
          <div>
            <GlButton class="mx-auto d-block my-3">
              Clone a project
            </GlButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GlFormInput, GlButton } from '@gitlab/ui';

@Component({
  components: {
    GlButton,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
  .start-actions {
    max-width: 250px;

    &:not(:last-child) {
      border-right: 1px solid #e5e5e5;
    }
  }
</style>
