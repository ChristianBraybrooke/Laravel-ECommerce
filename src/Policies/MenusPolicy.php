<?php

namespace ChrisBraybrooke\ECommerce\Policies;

use App\User;
use Menu;
use Illuminate\Auth\Access\HandlesAuthorization;
use Carbon\Carbon;

class MenusPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the page.
     *
     * @param  \App\User  $user
     * @param  Menu  $menu
     * @return mixed
     */
    public function view(User $user, Menu $menu)
    {
        return $user->can('read menus');
    }

    /**
     * Determine whether the user can create pages.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->can('create menus');
    }

    /**
     * Determine whether the user can update the page.
     *
     * @param  \App\User  $user
     * @param  \App\Page  $page
     * @return mixed
     */
    public function update(User $user, Menu $menu)
    {
        return $user->can('update menus');
    }

    /**
     * Determine whether the user can update many pages.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function bulkUpdate(User $user)
    {
        return $user->can('update menus');
    }

    /**
     * Determine whether the user can delete the page.
     *
     * @param  \App\User  $user
     * @param  \App\Page  $page
     * @return mixed
     */
    public function delete(User $user, Menu $menu)
    {
        return $user->can('delete menus');
    }
}
