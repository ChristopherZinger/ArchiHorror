<script lang="ts">
import { AuthError, AUTH_ERRORS } from '../constants/errors/authErrors';

  import { addOfficeReview } from '../services/domains/reviews/addOfficeReview';

  export let officeId: string;

  let textReview = '';
  let error: string;

  const submit = async () => {
    const newreview = await addOfficeReview({text: textReview}, officeId);
    if (newreview instanceof AuthError) {
      error = newreview.message;

      if (newreview.message === AUTH_ERRORS.IS_NOT_LOGGED_IN) {
        error = 'You need to be logged in.';
      }
    }
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
  {#if error}
  <div>{error}</div>
  {/if}
</div>

<style>
  textarea {
    display: block;
    width: 600px;
    height: 300px;
  }
</style>