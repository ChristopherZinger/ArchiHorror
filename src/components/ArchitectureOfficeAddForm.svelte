<script lang="ts">
  import { architectureOffice } from '../services/domains/architectureOffice';

  let office = {
    name: '',
    city: ''
  }

  const submit = () => {
    architectureOffice.addDocument(office);
  }
</script>

<div>
  <h4>Add Office</h4>
  <form on:submit|preventDefault={submit}>
    <label for="office-name">Office Name:</label>
    <input type="text" id="office-name" bind:value={office.name} />
    
    <label for="office-city">Office City:</label>
    <input type="text" id="office-name" bind:value={office.city} />

    <button type="submit">Submit new office : {office.name}</button>
  </form>
</div>