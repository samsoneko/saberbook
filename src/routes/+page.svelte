<script lang="ts">
    let { data } = $props();
</script>

{#if data.user}
    <h1>Hi, {data.user.username}!</h1>
    <p>This is going to be the landing page</p>
{/if}