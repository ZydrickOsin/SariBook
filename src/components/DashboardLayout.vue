<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const menuVisible = ref(false)

const menuItems = [
  {
    title: 'Transactions',
    icon: 'mdi-dump-truck',
    children: [
      { title: 'Transaction List', route: '/item', icon: 'mdi-format-list-bulleted' },
      { title: 'Tax Calculation', route: '/tax', icon: 'mdi-calculator' },
    ],
  },
  {
    title: 'Paid',
    icon: 'mdi-account',
    children: [
      { title: 'List', route: '/taxsub', icon: 'mdi-file-document-outline' },
    ],
  },
]
</script>


<template>
  <v-app class="bg-grey-lighten-4">
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Admin</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" class="elevation-8" width="310">
      <v-list dense>
        <template v-for="item in menuItems" :key="item.title">
          <!-- Grouped Menu -->
          <v-list-group v-if="item.children" color="primary">
            <template #activator="{ props }">
              <v-list-item v-bind="props" class="px-6 py-4">
                <div class="d-flex align-center">
                  <v-icon size="28" color="primary" class="me-2">{{ item.icon }}</v-icon>
                  <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
                </div>
              </v-list-item>
            </template>

            <!-- Child items with icons -->
            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.route"
              link
              class="pl-10"
              active-class="bg-blue-darken-3 text-white"
            >
              <v-icon size="20" color="primary" class="me-2">{{ child.icon }}</v-icon>
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
    <v-footer app color="primary" class="text-center white--text py-2">
      &copy; {{ new Date().getFullYear() }} Transaction System. All rights reserved.
    </v-footer>
  </v-app>
</template>

