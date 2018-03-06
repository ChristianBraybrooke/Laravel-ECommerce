<?php

    /**
     * Your package routes would go here
     */
    Route::get('/{any?}', function () {
        return view('ecommerce::admin')->render();
    })->where('any', '.*')
     ->middleware('auth')
     ->name('admin');
