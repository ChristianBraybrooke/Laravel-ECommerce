<?php

namespace ChrisBraybrooke\ECommerce\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewOrderNotification extends Notification
{
    use Queueable;

    protected $order;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $invoice = $this->order->mediaByLocation('invoice')->first();

        return (new MailMessage)
                    ->subject(config('app.name', 'TCO') . ' Order Confirmation - ' . $this->order->invoice['number'])
                    ->greeting("Order {$this->order->invoice['number']} Confirmed!")
                    ->line('Thank you for placing an order with '  . config('app.name', 'TCO'))
                    ->line("Please find your invoice for {$this->order->cart['currency']}{$this->order->cart['totals']['Total']} attached below.")
                    ->action('View Invoice', $invoice->getFullUrl())
                    ->line('Thank you for shoping with us!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
