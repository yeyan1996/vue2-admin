<template>
    <svg class="svg_icon" aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
    export default {
        name: 'svgIcon',
        props: {
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.name}`
            },

        }
    }
</script>

<style scoped>
    .svg_icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
