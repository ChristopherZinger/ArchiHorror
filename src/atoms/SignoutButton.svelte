<script lang="ts">
  import { BaseAuth } from '../services/auth/baseAuth';

  const baseAuth = new BaseAuth();

  let isLoading: boolean = false;

  const signout = async () => {
    isLoading = true;
    await baseAuth.signout()
    isLoading = false;
  }
  
</script>

<button on:click={signout} disabled={isLoading}>Signout</button>