<script>
  import { onMount } from 'svelte';
  import { architectureOffice } from '../services/domains/architectureOffice';

  let offices = [];
  let allDocumentsLoaded = false;

  const loadMoreDocuments = async () => {
    if (allDocumentsLoaded) return;
    const documentSnapshots = await architectureOffice.getPaginatedDocuments();
    const updatedListOfOffices = [...offices];
    documentSnapshots.forEach(i => updatedListOfOffices.push(i.data()));
    offices = updatedListOfOffices;

    if (!documentSnapshots.docs[documentSnapshots.docs.length-1]) {
      allDocumentsLoaded = true;
    }
  }
  
  onMount(async () => {
    await loadMoreDocuments();
  })
</script>

<div>
  <bold>List Of Architecture offices</bold>
  <ul>
    {#if offices.length > 0}
      {#each offices as office}
        <li>{office.name}</li>
      {/each}
    {/if}
  </ul>
  <button on:click={loadMoreDocuments} disabled={allDocumentsLoaded}>
    { allDocumentsLoaded ? 'No more documents' : 'Load More Documents'}
  </button>
</div>