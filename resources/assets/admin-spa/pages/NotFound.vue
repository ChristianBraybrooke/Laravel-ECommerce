<template lang="html">
<div class="not_found_wrap">
  <h1>Page Not Found</h1>
  <pre>{{ $route.fullPath }}</pre>
  <p>The page you are trying to access cannot be found, please try again.</p>
</div>


</template>

<script>
export default {
}
</script>

<style lang="css">
.not_found_wrap {
    text-align: center;
}
</style>
