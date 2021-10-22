<script lang="ts">
  import { authWithEmailAndPassword } from '../services/auth/authWithEmailAndPassword';

  let email: string;
  let password: string;
  let passwordRepeat: string;

  $: disabled = !password || password !== passwordRepeat;

  const submit = async () => {
    const user = await authWithEmailAndPassword.createUserAndSignin(email, password);
  }
</script>


<div>
  <h4>Register</h4>
    <div>
    <form on:submit|preventDefault={submit}>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} />

      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password}/>

      <label for="password-repeat">Password</label>
      <input type="password" id="password-repeat" bind:value={passwordRepeat}/>

      <button type="submit" disabled={disabled}>Submit</button>
    </form>
  </div>
</div>