<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status} {page.error?.message}</h1>
<p>Uh oh. Something has gone wrong! Report an issue on github.</p>
