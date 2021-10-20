<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Home from './pages/home.svelte';
  import Login from './pages/login.svelte';
</script>


<Router>
  <Route path='/'>
    <Home />
  </Route>

  <Route path='/login'>
    <Login />
  </Route>

  <Route path='/office-review'>
    <div>
      Office Review
    </div>
  </Route>
</Router>


