<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { ref } from 'vue'

const content = ref("# Welcome to StackEdit!\n" +
    "\n" +
    "Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.\n" +
    "\n" +
    "\n" +
    "# Files\n" +
    "\n" +
    "StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**\n" +
    "\n" +
    "## Create files and folders\n" +
    "\n" +
    "The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.\n" +
    "\n" +
    "## Switch to another file\n" +
    "\n" +
    "All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.\n" +
    "\n" +
    "## Rename a file\n" +
    "\n" +
    "You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.\n" +
    "\n" +
    "## Delete a file\n" +
    "\n" +
    "You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.\n" +
    "\n" +
    "## Export a file\n" +
    "\n" +
    "You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.\n" +
    "\n" +
    "\n" +
    "# Synchronization\n" +
    "\n" +
    "Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.\n" +
    "\n" +
    "There are two types of synchronization and they can complement each other:\n" +
    "\n" +
    "- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.\n" +
    "\t> To start syncing your workspace, just sign in with Google in the menu.\n" +
    "\n" +
    "- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.\n" +
    "\t> Before starting to sync files, you must link an account in the **Synchronize** sub-menu. ")
const mode = ref('light')
const pageTitle = ref('Vue.JS nedir?')
</script>

<template>
  <DefaultLayout>
    <div class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">

        <VueShowdown class="prose" :markdown="content"
                     flavor="ghost"
                     :options="{ emoji: true }" />
        <h2>Test</h2>

    </div>
  </DefaultLayout>
</template>
