<script>
	let { children, ...rest } = $props()
</script>

<span class="font-semibold text-black dark:text-black">
    {@render children?.()}
</span>
