<?php

    /**
     * Your package routes would go here
     */
    Route::get('/{any?}', function () {
        if (Auth::user()->hasRole('admin')) {
            return view('ecommerce::admin')->render();
        } else {
            return redirect('login');
        }
    })->where('any', '.*')
      ->middleware(['auth'])
      ->name('admin');
