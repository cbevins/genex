<script>
	let { children, ...rest } = $props()
</script>

<h1 class="text-2xl font-semibold text-black dark:text-black">
    {@render children?.()}
</h1>
