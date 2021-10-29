<script lang="ts">
  import { authWithEmailAndPassword } from '../services/auth/authWithEmailAndPassword';

  let isLoading: boolean = false;

  const signout = async () => {
    isLoading = true;
    await authWithEmailAndPassword.signout()
    isLoading = false;
  }
  
</script>

<button on:click={signout} disabled={isLoading}>Signout</button>