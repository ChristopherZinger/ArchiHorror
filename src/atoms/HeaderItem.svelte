<script lang="ts">
  import { Link } from 'svelte-navigator';


  interface ILink {
    text: string
    url: string
  };

  export let link: ILink;

</script>

<div>
  <Link to={link.url}>{link.text}</Link>
</div>