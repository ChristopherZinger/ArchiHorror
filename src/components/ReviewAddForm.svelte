<script lang="ts">
  import { addOfficeReview } from '../services/domains/reviews/addOfficeReview';

  export let officeId: string;

  let textReview = '';

  const submit = async () => {
    const newreview = await addOfficeReview({text: textReview}, officeId);
    console.log('new review: ', newreview);
  }
</script>

<div>
  <form on:submit|preventDefault={submit}>
    <div>
      <label for="text-review">What was your experience in this office?</label>
      <textarea type="textarea" id="text-review" bind:value={textReview} ></textarea>
    </div>

    <button type="submit">Submit Review</button>
  </form>
</div>

<style>
  textarea {
    display: block;
    width: 600px;
    height: 300px;
  }
</style>