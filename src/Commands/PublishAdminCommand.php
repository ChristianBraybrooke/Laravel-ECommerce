<?php

namespace ChrisBraybrooke\ECommerce\Commands;

use Illuminate\Console\Command;
use App\User;
use Validator;

class PublishAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ecommerce:publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish the admin spa.';

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
        $this->info("Publishing admin SPA...");

        $this->call('vendor:publish', [
            '--tag' => 'ecommerce-admin',
            '--force' => true,
        ]);
    }
}
