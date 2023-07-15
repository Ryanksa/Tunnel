<svelte:head>
  <title>Establish a Tunnel</title>
</svelte:head>
<div class="h-screen grid place-items-center p-4">
  <div class="flex flex-col w-full border-opacity-50 max-w-sm">
    <form method="POST" action="?/create">
      <button class="btn btn-lg w-full btn-secondary">Create Tunnel</button>
    </form>
    <div class="divider">OR</div>
    <form
      method="POST"
      action="?/join"
      class="h-20 card rounded-box flex flex-row items-center justify-center gap-4"
    >
      <input
        name="id"
        type="text"
        placeholder="Enter ID"
        class="input input-bordered input-lg w-full"
      />
      <button class="btn btn-lg btn-secondary">Join</button>
    </form>
  </div>
</div>
