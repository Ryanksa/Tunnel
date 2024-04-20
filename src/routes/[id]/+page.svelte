<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import CopyButton from "$lib/components/CopyButton.svelte";
  import XIcon from "$lib/components/XIcon.svelte";
  import { enhance } from "$app/forms";

  export let data: PageData;

  let countdown = -1;
  onMount(() => {
    countdown = Math.round(60 - (Date.now() - data.created.getTime()) / 1000);
    const interval = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        countdown = 0;
        clearInterval(interval);
        fetch(`/api/${data.id}`, { method: "DELETE" });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <title>{data.id.toUpperCase()}</title>
</svelte:head>
<div
  class="max-w-2xl m-4 sm:m-12 sm:mx-auto p-4 sm:p-8 flex flex-col items-center gap-4 bg-base-200/25 rounded-3xl relative"
>
  <form method="POST" action="/actions/{data.id}?/close">
    <button class="btn btn-circle absolute top-4 right-4 btn-sm sm:btn-md">
      <XIcon size={18} color="white" />
    </button>
  </form>
  <h1
    class="text-5xl text-extrabold tracking-widest p-4 bg-neutral rounded-3xl font-mono uppercase"
  >
    {data.id}
  </h1>
  <form
    class="w-full flex flex-row gap-2 items-center justify-center p-4"
    method="POST"
    action="/actions/{data.id}?/send"
    use:enhance={({ formElement }) => {
      formElement.reset();
    }}
  >
    <input
      name="content"
      type="text"
      class="input input-bordered w-full input-md lg:input-lg"
      autofocus
    />
    <button class="btn btn-md lg:btn-lg tracking-widest">Send</button>
  </form>
  <div class="w-full px-4 flex flex-col gap-4">
    {#each data.messages as message, idx (message.id)}
      <div
        class="flex flex-row gap-2 items-center slide-in"
        style="--delay:{idx * 30}ms;"
      >
        <p class="px-4 py-2 rounded-2xl bg-slate-300/25">{message.content}</p>
        <CopyButton content={message.content} />
      </div>
    {/each}
  </div>
</div>
{#if countdown >= 0}
  <div
    class="fixed bottom-4 right-4 p-4 flex flex-col items-center gap-2 bg-slate-50/10 rounded-2xl"
  >
    <h3 class="text-lg">Tunnel closing in:</h3>
    <span class="countdown font-mono text-6xl">
      <span style="--value:{countdown};" />
    </span>
  </div>
{/if}

<style>
  .slide-in {
    animation: slide-in 300ms ease-in-out;
    animation-delay: var(--delay);
  }

  @keyframes slide-in {
    0% {
      translate: 3rem 0;
      opacity: 0;
    }
    75% {
      opacity: 0.9;
    }
    100% {
      translate: 0 0;
      opacity: 1;
    }
  }
</style>
