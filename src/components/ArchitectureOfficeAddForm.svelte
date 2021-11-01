<script lang="ts">
  import { AuthError } from '../constants/errors/authErrors';
  import { FieldCreationError } from '../constants/errors/fieldcreationErrors';
  import { addOffice } from '../services/domains/offices/addOffice';

  let office = {
    name: '',
    city: ''
  }

  let error;

  const submit = async () => {
    const newoffice = await addOffice(office);
    if (newoffice instanceof FieldCreationError) {
      error = newoffice.message;
    }

    if (newoffice instanceof AuthError) {
      error = newoffice.message
    }
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