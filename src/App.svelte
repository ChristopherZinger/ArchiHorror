<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Home from './pages/Home.svelte';
  import Auth from './pages/Auth.svelte';
  import OfficeDetail from './pages/OfficeDetail.svelte';
</script>

<Router>
  <Route path='/' component={Home} />
  <Route path='/login' component={Auth} />
  <Route path='/office/:officeId' component={OfficeDetail} />
</Router>
