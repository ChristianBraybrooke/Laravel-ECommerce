<?php

namespace ChrisBraybrooke\ECommerce\Commands;

use Illuminate\Console\Command;
use App\User;
use Validator;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ecommerce:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an admin user.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Setup admin user...");

        $user = [];
        $user['first_name'] = $this->ask('First Name');
        $user['last_name'] = $this->ask('Last Name');
        $user['email'] = $this->ask('Email');
        $user['password'] = $this->secret('Password');

        $validator = Validator::make($user, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $this->error('Please ensure all user fields are filled!');

            foreach ($validator->errors()->all() as $message) {
                $this->error("** {$message} **");
            }
        } else {
            $user = User::create([
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
            ]);

            $user->assignRole('admin');

            $this->info("User / Admin {$user->name} created! ID: {$user->id}");
        }
    }
}
