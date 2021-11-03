<script lang="ts">
  import { getUserPopulator } from '../populateDB/populateUsers';

  let isLoading = false;
  let populated = false;
  const populateUsers = getUserPopulator();
  let populate = async () => {
    isLoading = true;
    populated = await populateUsers();
    console.log('Populated: ', populated);
    isLoading = false;
  } 
</script>

<div>
  <button on:click={() => populate()} disabled={isLoading||populated}>{populated ? 'Users were populated' : 'Populate users'}</button>
</div>