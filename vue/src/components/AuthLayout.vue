<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { LockClosedIcon } from '@heroicons/vue/solid'

export default {
  components: {
    LockClosedIcon,
  },
}
</script>
  