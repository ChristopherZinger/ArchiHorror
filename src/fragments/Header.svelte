<script lang="ts">
  import HeaderItem from '../atoms/HeaderItem.svelte';


</script>

<header>
  <div class="container">
    <HeaderItem link={{text: 'Home', url: '//'}} />
    <HeaderItem link={{text: 'Login', url: '//login'}} />
  </div>
</header>


<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>