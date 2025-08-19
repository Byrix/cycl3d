<script lang='ts'>
  import BtnHamburger from "./buttons/btn-Hamburger.svelte";
  import BtnTheme from '$lib/ui/buttons/BtnTheme.svelte';
</script>

<div class='navbar bg-base-200 shadow-sm border-b-4 border-base-300'>
  <div class='navbar-start'>
    <div class='dropdown'>
      <div tabIndex={0} role='button' class='btn btn-ghost lg:hidden'>
        <BtnHamburger />
      </div>
      <ul tabIndex={0} class='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2'>
        <li><a>Item 1</a></li>
      </ul>
    </div>
    <a href='/' class='btn btn-ghost text-4xl'>cycl<span class='text-primary -ml-1'>3d</span></a>
  </div>
  <div class='navbar-end hidden lg:flex'>
    <ul class='menu menu-horizontal px-1'>
      <!-- <li>Item 1</li> -->
       <li><BtnTheme /></li>
    </ul>
  </div>
</div>
