<script lang="ts">
  import FileUploadIcon from "$lib/icons/FileUploadIcon.svelte";

  export let name: string | null = null;
  export let onSelect: (file: File | null) => void;
</script>

<div
  class="relative w-8 h-8 grid place-items-center rounded-full bg-slate-300/10"
>
  <FileUploadIcon size={18} color="white" />
  <input
    {name}
    type="file"
    class="absolute w-full h-full opacity-0"
    on:click={(event) => {
      if (event.target) {
        // @ts-ignore
        event.target.value = "";
        onSelect(null);
      }
    }}
    on:change={(event) => {
      const files = event.currentTarget.files;
      if (files && files.length > 0) {
        onSelect(files[0]);
      }
    }}
  />
</div>
