<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const menuItems = [
  {
    title: 'Transactions',
    icon: 'mdi-dump-truck',
    children: [
      { title: 'Transaction List', route: '/item' },
      { title: 'Tax Calculation', route: '/tax' },
    ],
  },
  {
    title: 'Paid',
    icon: 'mdi-account',
    children: [
      { title: 'List', route: '/taxsub' },
    ],
  },
]
</script>

<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" class="elevation-8" width="310">
      <v-list dense>
        <template v-for="item in menuItems" :key="item.title">
          <!-- Grouped Items -->
          <v-list-group v-if="item.children" color="primary">
            <template #activator="{ props }">
              <v-list-item v-bind="props" class="px-6 py-4">
                <div class="d-flex align-center">
                  <v-icon size="36" color="primary" class="me-2">{{ item.icon }}</v-icon>
                  <v-list-item-title class="font-weight-medium mb-0">
                    {{ item.title }}
                  </v-list-item-title>
                </div>
              </v-list-item>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.route"
              link
              class="pl-10"
              active-class="bg-blue-darken-3 text-white"
            >
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Single Item -->
          <v-list-item
            v-else
            :to="item.route"
            link
            class="my-1 px-6 py-3 transition-all hover:bg-blue-darken-3"
            active-class="bg-blue-darken-3 text-white"
          >
            <div class="d-flex align-center gap-3">
              <v-icon size="36" color="primary">{{ item.icon }}</v-icon>
              <span class="px-2 font-weight-medium">{{ item.title }}</span>
            </div>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
