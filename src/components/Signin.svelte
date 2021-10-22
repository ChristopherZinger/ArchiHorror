<script lang="ts">
  import { authWithEmailAndPassword } from '../services/auth/authWithEmailAndPassword';
  import SignoutButton from '../atoms/SignoutButton.svelte';

  let email: string;
  let isLoading: boolean = false;
  let password: string;

  const submit = async () => {
    isLoading = true;
    await authWithEmailAndPassword.signin(email, password);
    isLoading = false;
  }
</script>

<div>
  <h4>Signin</h4>
    <SignoutButton />
    <div>
    <form on:submit|preventDefault={submit}>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} />

      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password}/>

      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  </div>
</div>