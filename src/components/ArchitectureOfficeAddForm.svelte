<script lang="ts">
  import { AuthError, AUTH_ERRORS } from '../constants/errors/authErrors';
  import { FieldCreationError } from '../constants/errors/fieldcreationErrors';
  import { addOffice } from '../services/domains/offices/addOffice';

  let office = {
    name: '',
    city: ''
  }

  let error: string;
  const submit = async () => {
    const newoffice = await addOffice(office);
    if (newoffice instanceof FieldCreationError) {
      error = newoffice.message;
    }

    if (newoffice instanceof AuthError) {
      error = newoffice.message

      if (newoffice.name === AUTH_ERRORS.IS_NOT_LOGGED_IN) {
        error = 'You need to be logged in to create a office.' 
      }
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
  {#if error}
    <div>
      {error}
    </div>
  {/if}
</div>