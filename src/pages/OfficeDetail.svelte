<script lang="ts">
  import type { DocumentData } from '@firebase/firestore';
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  import ReviewAddForm from '../components/ReviewAddForm.svelte';
  import ReviewList from '../components/ReviewList.svelte';
  import SurveyAddForm from '../components/SurveyAddForm.svelte';
  import { getOfficeById } from '../services/domains/offices/getDocumentById';

  export let officeSlug: string;

  let office: DocumentData;
  let errorMessage: string;

  onMount(async () => {
    const data = await getOfficeById(officeSlug);
    if (data instanceof Error) {
      errorMessage = data.message;
    } else {
      office = data;
    }
  })
</script>


<Header />
<div>
  {#if office}
    <h1>Office Detail Page: {office.name} in {office.city} </h1>
    <SurveyAddForm officeId={office.slug} />
    <ReviewAddForm officeId={office.slug} />
    <ReviewList officeId={office.slug} />
  {/if}

  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}
</div>