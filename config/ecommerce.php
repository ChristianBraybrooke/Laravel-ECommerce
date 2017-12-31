<?php

/**
 * Your package config would go here
 */

return [

  'web_uri' => env('ECOMMERCE_WEB_URI', 'admin'),


  'web_middleware' => env('ECOMMERCE_WEB_MIDDLEWARE', 'web'),


  'api_uri' => env('ECOMMERCE_API_URI', 'api/middleware'),


  'api_middleware' => env('ECOMMERCE_API_MIDDLEWARE', 'auth:api'),
];
