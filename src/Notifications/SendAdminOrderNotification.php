<?php

namespace ChrisBraybrooke\ECommerce\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SendAdminOrderNotification extends Notification
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
                    ->subject(config('app.name', 'TCO') . ' New Order - ' . $this->order->invoice['number'])
                    ->greeting("Order {$this->order->invoice['number']}: {$this->order->status}")
                    ->line('Congratulations! There was a new order on the website.')
                    ->line("You can find more information in the admin panel, or click below.")
                    ->action('View Order', url('/admin/orders/' . $this->order->id));
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
