<?php

namespace ChrisBraybrooke\ECommerce\Policies;

use App\User;
use App\Gallery;
use Illuminate\Auth\Access\HandlesAuthorization;
use Carbon\Carbon;

class GalleriesPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the gallery.
     *
     * @param  \App\User  $user
     * @param  \App\Gallery  $gallery
     * @return mixed
     */
    public function view(User $user, Gallery $gallery)
    {
        // Gallery is not live
        if (is_null($gallery->live_at) || $gallery->live_at > Carbon::now()->toDateTimeString()) {
            return $user->can('read draft galleries');
        }

        return true;
    }

    /**
     * Determine whether the user can create galleries.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->can('create galleries');
    }

    /**
     * Determine whether the user can update the gallery.
     *
     * @param  \App\User  $user
     * @param  \App\Gallery  $gallery
     * @return mixed
     */
    public function update(User $user, Gallery $gallery)
    {
        return $user->can('update galleries');
    }

    /**
     * Determine whether the user can delete the gallery.
     *
     * @param  \App\User  $user
     * @param  \App\Gallery  $gallery
     * @return mixed
     */
    public function delete(User $user, Gallery $gallery)
    {
        return $user->can('delete galleries');
    }
}
