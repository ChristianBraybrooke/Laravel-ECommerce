<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Activitylog\Traits\LogsActivity;
use Laravel\Passport\HasApiTokens;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Events\UserCreated;

class User extends Authenticatable
{
    use Notifiable, HasRoles, LogsActivity, HasApiTokens, ResponsableTrait, FormatDatesTrait;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->attributes['name'] = $model->name ?: "{$model->first_name}  {$model->last_name}";
        });
    }

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => UserCreated::class,
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
      'name', 'first_name', 'last_name', 'gender', 'dob', 'company', 'phone', 'email', 'password', 'timezone', 'language',
      'stripe_id', 'last_login', 'marketing_preferences', 'billing_address_line1', 'billing_address_line2',
      'billing_address_town', 'billing_address_county', 'billing_address_postcode',
      'billing_address_country', 'shipping_address_line1', 'shipping_address_line2', 'shipping_address_town',
      'shipping_address_county', 'shipping_address_postcode', 'payment_source_id', 'payment_source_brand',
      'payment_source_country', 'payment_source_last4', 'payment_source_exp_month', 'payment_source_exp_year', 'billing_address_name',
      'billing_address_company', 'shipping_address_name', 'shipping_address_company'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'first_name', 'last_name', 'gender', 'dob', 'company', 'phone', 'email', 'password', 'timezone', 'language',
        'stripe_id', 'last_login', 'marketing_preferences', 'billing_address_line1', 'billing_address_line2',
        'billing_address_town', 'billing_address_county', 'billing_address_postcode',
        'billing_address_country', 'shipping_address_line1', 'shipping_address_line2', 'shipping_address_town',
        'shipping_address_county', 'shipping_address_postcode', 'payment_source_id', 'payment_source_brand',
        'payment_source_country', 'payment_source_last4', 'payment_source_exp_month', 'payment_source_exp_year', 'billing_address_name',
        'billing_address_company', 'shipping_address_name', 'shipping_address_company'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
      * The attributes that should be cast to native types.
      *
      * @var array
      */
    protected $casts = [
         'last_login' => 'array',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'dob'
    ];

    /**
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableOrderByAlias()
    {
        return [
            'name' => 'first_name',
            'roles.data' => 'roles.name'
        ];
    }

    /**
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableSearch()
    {
        return [
          'id',
          'company',
          'first_name',
          'last_name',
          'email'
        ];
    }

    public function logs()
    {
        return $this->hasMany('App\Log', 'causer_id');
    }

    /**
     * Extend the query used.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function responsableExtendQuery($query, $request)
    {
        if ($request->orderBy === 'roles.data') {
            return $query->leftJoin('model_has_roles', function ($join) {
                $join->on('users.id', '=', 'model_has_roles.model_id')
                     ->where('model_has_roles.model_type', '=', 'App\User')
                     ->where(
                         'model_has_roles.role_id',
                         '=',
                         '(SELECT role_id FROM model_has_roles WHERE model_id = users.id LIMIT 1)'
                     );
            })
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id');
        }
        return $query->withRole($request->withRole);
    }

    /**
     * Scope a query to only include users with a specific role.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $role
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithRole($query, $role)
    {
        return $role ? $query->join('model_has_roles', function ($join) {
            $join->on('users.id', '=', 'model_has_roles.model_id')
                 ->where('model_has_roles.model_type', '=', 'App\User');
        })
        ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
        ->where('roles.name', $role) : $query;
    }

    /**
     * Set default event log message.
     *
     * @var array
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "User was: {$eventName}";
    }

    /**
     * Format the users full name.
     *
     * @param $value
     * @var string
     */
    public function getNameAttribute($value)
    {
        return $value ? $value : "{$this->first_name} {$this->last_name}";
    }

    /**
     * Format the users full name.
     *
     * @param $value
     * @var string
     */
    public function setNameAttribute($value)
    {
        return $value ? $value : "{$this->first_name} {$this->last_name}";
    }

    /**
     * Get First Name Attribute
     *
     * @param $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
         return $value ? $value : str_before($this->name, ' ');
    }

    /**
     * Get Last Name Attribute
     *
     * @param $value
     * @return String
     */
    public function getLastNameAttribute($value)
    {
        return $value ? $value : str_after($this->name, ' ');
    }
}
