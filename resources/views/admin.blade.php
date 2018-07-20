<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Admin</title>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="{{ mix('css/reset.css', 'vendor/ecommerce') }}">
    <link rel="stylesheet" href="{{ mix('css/admin.css', 'vendor/ecommerce') }}">
    <script src="https://js.stripe.com/v3/"></script>

  </head>
  <a class="admin_banner" href="/" style="background: @ShopData('theme_color')">Website</a>
  <body>
    <div id="app"></div>

    <script type="text/javascript">
        window.bugsnag = {
          key: '{{ config('services.bugsnag.key') ?: null}}',
          active: {{ config('services.bugsnag.active') ?: 'false' }},
          env: '{{ config('services.bugsnag.env') ?: 'production' }}',
          user: {
            id: {{ Auth::user()->id }},
            name: '{{ Auth::user()->name }}',
            email: '{{ Auth::user()->email }}',
          }
        }
    </script>
    @ShopDataScript

    <script src="{{ mix('js/manifest.js', 'vendor/ecommerce') }}"></script>
    <script src="{{ mix('js/vendor.js', 'vendor/ecommerce') }}"></script>
    <script src="{{ mix('js/admin.js', 'vendor/ecommerce') }}"></script>
  </body>
</html>
