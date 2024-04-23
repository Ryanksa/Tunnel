<script lang="ts">
  export let size: number;
  export let color: string;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 32 32"
>
  <path
    fill={color}
    d="M6,4v24h20V14.485c0-1.591-0.632-3.117-1.757-4.243l-4.485-4.485C18.632,4.632,17.106,4,15.515,4H6z M22,27H10	c-1.105,0-2-0.895-2-2V7h8.36c0.953,0,1.774,0.673,1.961,1.608L19,12l3.392,0.678C23.327,12.865,24,13.686,24,14.64V25	C24,26.105,23.105,27,22,27z"
  ></path>
</svg>
