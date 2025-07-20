<script>
	let { children, ...rest } = $props()
</script>

<p class="text-base mt-3 indent-8 mx-2 text-black dark:text-black">
    {@render children?.()}
</p>