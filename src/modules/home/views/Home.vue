<template>
  <div class="w-[1024px] m-auto">
    <h1 class="text-lg mb-2">Home Page</h1>
    <p class="text-sm mb-1">
      This is the home page. I built this application in a modular form so that
      you can easily add new modules such as (employee, factory, customer). Just
      add a new folder to modules and connect the routing.
    </p>
    <p class="text-sm mb-4">
      To go to the main truck management applications, you can
      <router-link
        class="text-[color:rgb(var(--surface-700))] hover:text-[color:rgb(var(--surface-900))] font-semibold"
        to="/trucks"
        >click here</router-link
      >
      or there is a link to the application in the header.
    </p>
    <section class="text-sm mb-2">
      <b>
        I didn't manage to prepare all the things I wanted to do. I still had
        plans:
      </b>
      <ul class="mt-2">
        <li>- preparation of e2e tests in Cypress,</li>
        <li>
          - expanding the list and adding the ability to add/remove/modify in
          bulk,
        </li>
        <li>- adding a detail page for specific trucks,</li>
        <li>
          - direct modification in the list, e.g. changing the status of a given
          truck,
        </li>
        <li>
          - error mapping from the backend and better display of possible errors
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts"></script>
