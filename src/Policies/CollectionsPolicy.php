<?php

namespace ChrisBraybrooke\ECommerce\Policies;

use App\User;
use App\Collection;
use Illuminate\Auth\Access\HandlesAuthorization;
use Carbon\Carbon;
use Auth;

class CollectionsPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the collection.
     *
     * @param  \App\User  $user
     * @param  \App\Collection  $collection
     * @return mixed
     */
    public function view(User $user, Collection $collection)
    {
        // Collection is not live
        if (is_null($collection->live_at) || $collection->live_at > Carbon::now()->toDateTimeString()) {
            return $user->can('read draft collections');
        }

        return true;
    }

    /**
     * Determine whether the user can create collections.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->can('create collections');
    }

    /**
     * Determine whether the user can update the collection.
     *
     * @param  \App\User  $user
     * @param  \App\Collection  $collection
     * @return mixed
     */
    public function update(User $user, Collection $collection)
    {
        if (is_null($collection->live_at) || $collection->live_at > Carbon::now()->toDateTimeString()) {
            return $user->can('read draft collections') && $user->can('update collections');
        }
        return $user->can('update collections');
    }

    /**
     * Determine whether the user can update many collections.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function bulkUpdate(User $user)
    {
        return $user->can('update collections');
    }

    /**
     * Determine whether the user can delete the collection.
     *
     * @param  \App\User  $user
     * @param  \App\Collection  $collection
     * @return mixed
     */
    public function delete(User $user, Collection $collection)
    {
        return $user->can('delete collections');
    }
}
