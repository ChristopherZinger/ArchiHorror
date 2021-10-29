<script lang="ts">
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { getPagination, PaginationRangeError } from '../services/domains/helpers/getPaginatedDocuments';
  import type { DocumentData } from 'firebase/firestore';
  import { collections } from '../services/domains/globalConstants';

  let offices: DocumentData[] = [];
  let allDocumentsLoaded = false;
  let isLoading = false;
  const getMoreDocuments = getPagination(collections.office);

  const loadMoreOffices = async () => {
    isLoading = true;
    try {
      const newoffices = await getMoreDocuments(); 
      offices = [...offices, ...newoffices];
    } catch (err) {
      if (err instanceof PaginationRangeError) {
        allDocumentsLoaded = true;
      }
      console.error(err.message); 
    }
    isLoading = false;
  }

  onMount(async () => {
    await loadMoreOffices();
  })

</script>

<div>
  <bold>List Of Architecture offices</bold>
  <ul>
    {#if offices?.length > 0}
      {#each offices as office}
        <li><Link to={`/office/${office.slug}`}>{office.name}</Link></li>
      {/each}
    {/if}
    {#if isLoading} 
      <li>... loading.</li>
    {/if}
  </ul>
  <button on:click={loadMoreOffices} disabled={allDocumentsLoaded || isLoading}>
    { allDocumentsLoaded ? 'No more documents' : 'Load More Documents'}
  </button>
</div>