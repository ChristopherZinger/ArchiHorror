<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Home from './pages/Home.svelte';
  import Auth from './pages/Auth.svelte';

</script>


<Router>
  <Route path='/'>
    <Home />
  </Route>

  <Route path='/login'>
    <Auth />
  </Route>

  <Route path='/office-review'>
    <div>
      Office Review
    </div>
  </Route>
</Router>


