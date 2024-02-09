<!-- need to remove -->
<li class="nav-item">
    <a href="{{ route('home') }}" class="nav-link {{ Request::is('home') ? 'active' : '' }}">
        <i class="nav-icon fas fa-home"></i>
        <p>Home</p>
    </a>
</li>
<li class="nav-item  ">
    <a href="{{ route('district.index') }}"
        class="nav-link  {{ request()->routeIs('district.*') ? 'active' : '' }}   ">
        {{-- <i class="far fa-map-marker nav-icon "></i> --}}
        <i class="fas fa-map-marker-alt text-green"></i>
        <p>Districts </p>
    </a>
</li>
 
    <li class="nav-item    has-treeview  {{ request()->is('settings*') ? 'menu-open' : '' }}">
        <a href="#" class="nav-link  ">
            <i class="nav-icon text-yellow fas fa fa-wrench"></i>
            <p>Settings </p>
        </a>

        <ul class="nav nav-treeview">
 

                <li class="nav-item ">
                    <a href="{{ route('ecs.index') }}"
                        class="nav-link  {{  request()->routeIs('ecs.*') ? 'active' : '' }}   ">
                        <i class="far fa-circle nav-icon text-yellow"></i>
                        <p>ECS </p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a href="{{ route('crop-type.index') }}"
                        class="nav-link  {{  request()->routeIs('crop-type.*') ? 'active' : '' }}   ">
                        <i class="far fa-circle nav-icon text-yellow"></i>
                        <p>Crop Types </p>
                    </a>
                </li>  
                <li class="nav-item ">
                    <a href="{{ route('crop.index') }}"
                        class="nav-link  {{  request()->routeIs('crop.*') ? 'active' : '' }}   ">
                        <i class="far fa-circle nav-icon text-yellow"></i>
                        <p>Crop</p>
                    </a>
                </li>  
        </ul>

    </li> 


