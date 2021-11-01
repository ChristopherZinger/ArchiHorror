<script lang="ts">
  import Header from '../components/Header.svelte';
  import Signin from '../components/Signin.svelte';
  import Register from '../components/Register.svelte';

  let currentTab = 'signin';

</script>


<Header />
<main>
  <h1>Create new User</h1>
  <ul class="tabs">
    <li on:click={() =>{ currentTab = 'signin'}}>SignIn</li>
    <li on:click={() => { currentTab = 'signup'}}>SignUp</li>
  </ul>

  {#if currentTab === 'signup'}
    <Register />
  {:else if currentTab === 'signin'}
    <Signin />
  {/if}
</main>


<style>
  .tabs > li {
    cursor: pointer;
  }
</style>