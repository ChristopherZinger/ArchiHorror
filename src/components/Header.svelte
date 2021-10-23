<script lang="ts">
  import HeaderItem from '../atoms/HeaderItem.svelte';
import SignoutButton from '../atoms/SignoutButton.svelte';
  import { userStore } from '../stores/auth';

  let user; 
  userStore.subscribe(userFromStore => user = userFromStore);

</script>

<header>
  <div class="container">
    <HeaderItem link={{text: 'Home', url: '//'}} />
    {#if user}
      <p>{ user.email}</p>
    {/if}

    {#if user}
      <SignoutButton ></SignoutButton>
    {:else}
      <HeaderItem link={{text: 'Login', url: '//login'}} />
    {/if}
  </div>

</header>


<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>