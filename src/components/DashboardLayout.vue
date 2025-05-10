<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const menuItems = [
  {
    title: 'Transactions',
    icon: 'mdi-cash-multiple',
    children: [
      { title: 'Transaction List', route: '/item', icon: 'mdi-format-list-bulleted' },
      { title: 'Tax Calculation', route: '/tax', icon: 'mdi-calculator' },
    ],
  },
  {
    title: 'Paid',
    icon: 'mdi-check-circle-outline',
    children: [
      { title: 'List', route: '/taxsub', icon: 'mdi-file-document-outline' },
    ],
  },
]
</script>

<template>
  <v-app class="bg-grey-lighten-4">
    <!-- App Bar -->
    <v-app-bar app color="brown darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Admin Panel</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" class="elevation-10" width="280">
      <v-list dense nav>
        <template v-for="item in menuItems" :key="item.title">
          <!-- Grouped Menu -->
          <v-list-group
            v-if="item.children"
            :value="false"
            class="my-1 rounded-lg"
            prepend-icon=""
            append-icon="mdi-chevron-down"
          >
            <template #activator="{ props }">
              <v-list-item v-bind="props" class="rounded-lg">
                <v-list-item-icon>
                  <v-icon color="brown darken-2">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.route"
              link
              class="ms-6 rounded-lg"
              active-class="bg-brown-darken-2 text-white"
              exact
            >
              <v-list-item-icon>
                <v-icon color="brown">{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="brown darken-2" class="text-center white--text py-2">
      &copy; {{ new Date().getFullYear() }} Transaction System. All rights reserved.
    </v-footer>
  </v-app>
</template>
