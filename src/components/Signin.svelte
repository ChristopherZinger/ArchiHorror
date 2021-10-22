<script lang="ts">
  import { authWithEmailAndPassword } from '../services/auth/authWithEmailAndPassword';
  import { userStore } from '../stores/auth';

  let email: string;
  let password: string;

  const submit = async () => {
    const userFromFirebase = await authWithEmailAndPassword.signin(email, password);
  }
</script>

<div>
  <h4>Signin</h4>
    <div>
    <form on:submit|preventDefault={submit}>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} />

      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password}/>

      <button type="submit">Submit</button>
    </form>
  </div>
</div>