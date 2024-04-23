<script lang="ts">
  import CopyIcon from "$lib/icons/CopyIcon.svelte";

  export let content: string;

  let copied = false;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    copied = true;
  };

  const resetCopied = () => {
    copied = false;
  };
</script>

<div class="tooltip tooltip-right" data-tip={copied ? "Copied!" : "Copy"}>
  <button
    class="btn btn-ghost btn-square btn-xs"
    on:click={() => copyToClipboard(content)}
    on:mouseenter={resetCopied}
  >
    <CopyIcon size={15} color="white" />
  </button>
</div>
