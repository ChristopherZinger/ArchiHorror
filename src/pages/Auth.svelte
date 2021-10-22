<script lang="ts">
  import Header from '../components/Header.svelte';
  import Signin from '../components/Signin.svelte';
  import Register from '../components/Register.svelte';

  let currentTab = 'foo';

</script>


<Header />
<main>
  <h1>Create new User</h1>
  <ul>
    <li on:click={() =>{ currentTab = 'foo'; console.log(currentTab)}}>Foo</li>
    <li on:click={() => { currentTab = 'boo'; console.log(currentTab)}}>Boo</li>
  </ul>

  {#if currentTab === 'boo'}
    <Register />
  {:else if currentTab === 'foo'}
    <Signin />
  {/if}

</main>