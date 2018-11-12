<?php

Route::get('invoice', 'InvoiceController@show');
Route::get('invoice-download', 'InvoiceController@download');

Route::get('delivery-note', 'DeliveryNoteController@show');
Route::get('delivery-note-download', 'DeliveryNoteController@download');
