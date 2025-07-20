<script>
    // In future, this will have a popover to display the source and text and link to image
	let { children, refs, key, ...rest } = $props()
    let [source, text, href] = refs.get(key)
</script>

<span class="text-xs text-blue-600 dark:text-blue-500 hover:underline">
    [{key}]
</span>