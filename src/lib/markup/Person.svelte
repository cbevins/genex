<script>
	let { children, ggp=0, ...rest } = $props()

    function ord(n) {
        if (n === '1') return 'st'
        if (n === '2') return 'nd'
        if (n === '3') return 'rd'
        return 'th'
    }
</script>

{#if ggp}
<span class="text-xs text-black dark:text-black"><sup>{ggp}<sup>{ord(ggp)}</sup></sup>GGP</span>
{/if}

<span class="font-semibold text-black dark:text-black">
    {@render children?.()}
</span>
