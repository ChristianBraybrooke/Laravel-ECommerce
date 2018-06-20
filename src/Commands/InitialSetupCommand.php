<?php

namespace ChrisBraybrooke\ECommerce\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class InitialSetupCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ecommerce:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run the commands necessary to prepare the ECommerce package for use.';

    protected $ecommerce_config_file = 'ecommerce.php';
    protected $media_config_file = 'medialibrary.php';
    protected $permission_config_file = 'permission.php';
    protected $user_class_file = 'User.php';

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
        $overwrote_user = false;
        $this->info("Installing ECommerce package...");

        if (file_exists(config_path($this->ecommerce_config_file))) {
            if ($this->confirm("Overwrite config/{$this->ecommerce_config_file} with correct config?", 'yes')) {
                $this->copyConfigFile($this->ecommerce_config_file, $this->ecommerce_config_file);
            }
        } else {
            $this->copyConfigFile($this->ecommerce_config_file, $this->ecommerce_config_file);
        }

        if (file_exists(config_path($this->media_config_file))) {
            if ($this->confirm("Overwrite config/{$this->media_config_file} with correct config?", 'yes')) {
                $this->copyConfigFile("{$this->media_config_file}.stub", $this->media_config_file);
            }
        } else {
            $this->copyConfigFile("{$this->media_config_file}.stub", $this->media_config_file);
        }

        if (file_exists(config_path($this->permission_config_file))) {
            if ($this->confirm("Overwrite config/{$this->permission_config_file} with correct config?", 'yes')) {
                $this->copyConfigFile("{$this->permission_config_file}.stub", $this->permission_config_file);
            }
        } else {
            $this->copyConfigFile("{$this->permission_config_file}.stub", $this->permission_config_file);
        }

        $this->call('vendor:publish', [
            '--tag' => 'migrations'
        ]);

        $this->call('vendor:publish', [
            '--tag' => 'ecommerce-migrations'
        ]);

        $this->call('migrate');

        if ($this->confirm("Overwrite App\User with default user class?", 'yes')) {
            copy(__DIR__."/../../config/{$this->user_class_file}.stub", app_path($this->user_class_file));
            $overwrote_user = true;
        }

        if ($overwrote_user) {
            $this->call('ecommerce:admin');
        }
    }

    /**
     * Copy file to config dir.
     *
     * @return void
     */
    protected function copyConfigFile($file, $destination)
    {
        copy(__DIR__."/../../config/{$file}", config_path($destination));
    }
}
