<script lang="ts">
import type { DocumentData } from '@firebase/firestore';

  import { onMount } from 'svelte';
  import { getAllReviewsForTheOffice } from '../services/domains/reviews/getAllReviewsForOffice';

  export let officeId: string;

  let reviews: DocumentData[];
  let error: string;
  let isLoading = false;

  const getReviews = async () => {
    isLoading = true
    const data = await getAllReviewsForTheOffice(officeId);
    if (data instanceof Error) {

    } else {
      reviews = data;
    } 
    isLoading = false;
  }

  onMount(async () => {
    getReviews();
  })
</script>


<h5>Review List</h5>
{#if reviews && reviews.length}
<ul>
  {#each reviews as rev }
    <li>{rev.text}</li>
  {/each}
</ul>
{/if}

{#if isLoading}
  <p>... loading</p>
{/if}

{#if error}
<p class="error">{error}</p> 
{/if}

<style>
  .error {
    color: red;
  }
</style>