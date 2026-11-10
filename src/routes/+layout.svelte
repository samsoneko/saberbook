<script lang="ts">
	import favicon from '#lib/assets/favicon.png';
	import logo from '#lib/assets/logo.png';
	import { page } from '$app/state';
	let { data, children } = $props();
</script>

<svelte:head>
    <title>Saberroom</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-frame">
	<nav class="navbar-desktop">
        <div class="navbar-logo-area">
            <img class="navbar-logo" src={logo} alt="page logo">
        </div>

        <div class="navbar-button-area">
            <button class={['navbar-button', page.url.pathname === '/' ? 'active' : '']} aria-label="Home">
                <a class="navbar-icon" href="/" aria-label="Home"><i class="fas fa-home"></i> Home</a>
            </button>
            {#if data.user}
                <!-- User is logged in -->
                <button class={['navbar-button', page.url.pathname === '/profile' ? 'active' : '']} aria-label="Profile">
                    <a class="navbar-icon" href="/profile" aria-label="Profile"><i class="fas fa-user"></i> Profile</a>
                </button>
            {:else}
                <!-- User is logged out -->
                <button class='navbar-button' aria-label="Log In">
                    <a class="navbar-icon" href="/login"><i class="fas fa-right-to-bracket"></i> Log In</a>
                </button>
            {/if}
        </div>
    </nav>

    <nav class="navbar-mobile">
        <button class={['navbar-button', page.url.pathname === '/' ? 'active' : '']} aria-label="Home">
            <a class="navbar-icon" href="/" aria-label="Home"><i class="fas fa-home"></i> Home</a>
        </button>
        {#if data.user}
            <!-- User is logged in -->
            <button class={['navbar-button', page.url.pathname === '/profile' ? 'active' : '']} aria-label="Profile">
                <a class="navbar-icon" href="/profile" aria-label="Profile"><i class="fas fa-user"></i> Profile</a>
            </button>
        {:else}
            <!-- User is logged out -->
            <button class='navbar-button' aria-label="Log In">
                <a class="navbar-icon" href="/login"><i class="fas fa-right-to-bracket"></i> Log In</a>
            </button>
        {/if}
    </nav>

    <div class="app-content">
        {@render children()}
    </div>
</div>

<style>
	@import '#lib/assets/style.css';
</style>