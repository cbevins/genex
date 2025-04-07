<script>
	import '../app.css';
	import icon from '$lib/images/Collin.jpg'
	let { children } = $props();
</script>

<div class="relative">
    <a class="absolute right-2 top-2" href="/" >
		<img src={icon} alt="Home" width="32"/>
	</a>
</div>
{@render children()}
