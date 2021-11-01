<script lang='ts'>
import { FirestoreError } from '@firebase/firestore';

  import { addOfficeSurvey, NewSurveyUserInput } from '../services/domains/survey/addOfficeSurvey';

  export let officeId: string;

  const survey: NewSurveyUserInput = {
    boringProjects: false,
    delayedOrReducedSalary: false,
    microManagement: false,
    glassCeiling: false,
    homophobia: false,
    hostileManagement: false,
    overtime: false,
    racism: false,
    sexism: false,
    starvingSalary: false,
    toxicAtmosphere: false,
    workOnTheWeekends: false,
    violence: false,
    unpaidInternship: false
  }

  let error: string;
  let isLoading: boolean = false;

  const submit = async () => {
    isLoading = true
    const newsurvey = await addOfficeSurvey(survey, officeId);
    isLoading = false

    if (newsurvey instanceof FirestoreError) {
      error = newsurvey.message;
    }
  }
</script>

<div>
  <form on:submit|preventDefault={submit}>
    <div class="survey-options">
      <div>
        <label for="delayed-or-reduced-salary">Delayed or reduced salary.</label>
        <input type="checkbox" id="delayed-or-reduced-salary" bind:checked={survey.delayedOrReducedSalary} />
      </div>

      <div>
        <label for="boring-projects">Boring projects.</label>
        <input type="checkbox" id="boring-projects" bind:checked={survey.boringProjects} />
      </div>

      <div>
        <label for="micro-management">Delayed or reduced salary.</label>
        <input type="checkbox" id="micro-management" bind:checked={survey.microManagement} />
      </div>

      <div>
        <label for="glass-ceiling">Glass ceiling.</label>
        <input type="checkbox" id="glass-ceiling" bind:checked={survey.glassCeiling} />
      </div>

      <div>
        <label for="homophobia">Homophobia.</label>
        <input type="checkbox" id="homophobia" bind:checked={survey.homophobia} />
      </div>

      <div>
        <label for="overtime">Overtime.</label>
        <input type="checkbox" id="overtime" bind:checked={survey.overtime} />
      </div>

      <div>
        <label for="racism">Rasism.</label>
        <input type="checkbox" id="racism" bind:checked={survey.racism} />
      </div>

      <div>
        <label for="hostile-management">Hostile managers.</label>
        <input type="checkbox" id="hostile-management" bind:checked={survey.hostileManagement} />
      </div>

      <div>
        <label for="sexism">Sexism.</label>
        <input type="checkbox" id="sexism" bind:checked={survey.sexism} />
      </div>

      <div>
        <label for="starving-salary">Starving salary.</label>
        <input type="checkbox" id="starving-salary" bind:checked={survey.starvingSalary} />
      </div>

      <div>
        <label for="toxic-atmosphere">Toxic atmosphere.</label>
        <input type="checkbox" id="toxic-atmosphere" bind:checked={survey.toxicAtmosphere} />
      </div>

      <div>
        <label for="work-on-weekents">Work on weekends.</label>
        <input type="checkbox" id="work-on-weekents" bind:checked={survey.workOnTheWeekends} />
      </div>

      <div>
        <label for="violence">Delayed or reduced salary.</label>
        <input type="checkbox" id="violence" bind:checked={survey.violence} />
      </div>

      <div>
        <label for="unpaid-internship">Unpaid internship.</label>
        <input type="checkbox" id="unpaid-internship" bind:checked={survey.unpaidInternship} />
      </div>
    </div>

    <button type="submit" disabled={isLoading}>Submit</button>
  </form>

  {#if error }
  <div>{error}</div>
  {/if}

</div>

<style>
  .survey-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .survey-options > div {
    flex-basis: 30%;
  }
</style>