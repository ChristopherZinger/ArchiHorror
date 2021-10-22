<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Home from './pages/Home.svelte';
  import Auth from './pages/Auth.svelte';
  import { userStore } from './stores/auth';

  let myuser; 

  userStore.subscribe(_user => myuser = _user);

  console.log(myuser);

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

  <p>User name is : {myuser?.email || '--is not logged--'}</p>

