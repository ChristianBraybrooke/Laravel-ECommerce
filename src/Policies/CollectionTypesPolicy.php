<?php

namespace ChrisBraybrooke\ECommerce\Policies;

use App\User;
use App\CollectionType;
use Illuminate\Auth\Access\HandlesAuthorization;
use Carbon\Carbon;

class CollectionTypesPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the collectionType.
     *
     * @param  \App\User  $user
     * @param  \App\CollectionType  $type
     * @return mixed
     */
    public function view(User $user, CollectionType $type)
    {
        // Collection is not live
        if (is_null($type->live_at) || $type->live_at > Carbon::now()->toDateTimeString()) {
            return $user->can('read draft collection types');
        }

        return true;
    }

    /**
     * Determine whether the user can create collectionTypes.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->can('create collection types');
    }

    /**
     * Determine whether the user can update the collectionType.
     *
     * @param  \App\User  $user
     * @param  \App\CollectionType  $type
     * @return mixed
     */
    public function update(User $user, CollectionType $type)
    {
        if (is_null($type->live_at) || $type->live_at > Carbon::now()->toDateTimeString()) {
            return $user->can('read draft collection types') && $user->can('update collection types');
        }
        return $user->can('update collection types');
    }

    /**
     * Determine whether the user can update many collection types.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function bulkUpdate(User $user)
    {
        return $user->can('update collection types');
    }

    /**
     * Determine whether the user can delete the collectionType.
     *
     * @param  \App\User  $user
     * @param  \App\CollectionType  $type
     * @return mixed
     */
    public function delete(User $user, CollectionType $type)
    {
        return $user->can('delete collections');
    }
}
