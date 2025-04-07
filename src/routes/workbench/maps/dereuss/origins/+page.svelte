<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { dereussOriginsSvgGxml } from '$lib/maps/custom/dereuss/dereussOriginsSvgGxml.js'
    const gxml = dereussOriginsSvgGxml()
</script>

{@html gxmlStr(gxml)}