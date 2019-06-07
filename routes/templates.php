<?php

use ChrisBraybrooke\ECommerce\Notifications\NewOrderNotification;
use ChrisBraybrooke\ECommerce\Notifications\OrderCompleteNotification;

Route::get('invoice', 'InvoiceController@show');
Route::get('invoice-download', 'InvoiceController@download');

Route::get('delivery-note', 'DeliveryNoteController@show');
Route::get('delivery-note-download', 'DeliveryNoteController@download');

Route::get('emails/confirmation', function () {
    $notification = new NewOrderNotification(Order::first());
    $message = $notification->toMail(App\User::first());
    $markdown = new \Illuminate\Mail\Markdown(view(), config('mail.markdown'));
    return $markdown->render('vendor.notifications.email', $message->toArray());
});

Route::get('emails/complete', function () {
    $notification = new OrderCompleteNotification(Order::first());
    $message = $notification->toMail(App\User::first());
    $markdown = new \Illuminate\Mail\Markdown(view(), config('mail.markdown'));
    return $markdown->render('vendor.notifications.email', $message->toArray());
});
