<script lang="ts">
  import Header from '../components/Header.svelte';
  import AddOfficeForm from '../components/ArchitectureOfficeAddForm.svelte';
  import ArchitectureOfficeList from '../components/ArchitectureOfficeList.svelte';
</script>

<Header />
<main>
  <div class="container">
    <div class="banner">
      <h1>DOES WORKING IN YOUR ARCHITECTURE OFFICE FEELS LIKE A NIGHTMARE?</h1>
    </div>

    <AddOfficeForm />
    <ArchitectureOfficeList />

  </div>
</main>