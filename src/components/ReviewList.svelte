<script lang="ts">
  import { onMount } from 'svelte';
import { getAllReviewsForTheOffice } from '../services/domains/reviews/getAllReviewsForOffice';
  import { review } from '../services/domains/review';

  export let officeId: string;

  let reviews: any[];

  onMount(async () => {
    reviews = await getAllReviewsForTheOffice(officeId)
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