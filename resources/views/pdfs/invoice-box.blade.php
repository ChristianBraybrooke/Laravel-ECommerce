<div class="invoice-box">
    <h1 style="text-align: center;">{{ $order->invoice['name'] ?? '' }}</h1>
    <table cellpadding="0" cellspacing="0">
        <tr class="top">
            <td colspan="4">
                {{-- <table> --}}
                    <tr>
                        <td class="title" colspan="2">
                            @if (isset($logo) && $logo->url)
                                <img src="{{ asset($logo->url) }}" style="width:100%; max-width:220px;">
                            @endif
                        </td>

                        <td colspan="2">
                            Invoice #: {{ $order->invoice['number'] ?? '' }}<br>
                            Created: {{ $order->invoice['issued_at'] ?? '' }}<br>
                            Due: {{ $order->invoice['due_by'] ?? '' }}
                        </td>
                    </tr>
                {{-- </table> --}}
            </td>
        </tr>

        <tr class="information">
            <td colspan="2">
                <strong>Shipping Address</strong> <br>
                @foreach ($order->shipping_address as $key => $shipping_address)
                    {{ $shipping_address }} @if ($shipping_address) <br> @endif
                @endforeach
            </td>

            <td colspan="2">
                <strong>Billing Address</strong> <br>
                @foreach ($order->billing_address as $key => $billing_address)
                    {{ $billing_address }} @if ($billing_address) <br> @endif
                @endforeach
            </td>
        </tr>

        <tr class="details">
            <td style="padding-top: 40px" colspan="2">
                <strong>Payment Method</strong>
            </td>

            <td style="padding-top: 40px" colspan="2">
                {{ $order->payment_method }}
            </td>
        </tr>

        <tr class="details">

            <td colspan="2">
                <strong>Email</strong>
            </td>

            <td colspan="2">
                {{ $order->user_email }}
            </td>
        </tr>
        <tr class="details">

            <td style="padding-bottom: 40px" colspan="2">
                <strong>Telephone</strong>
            </td>

            <td colspan="2">
                {{ $order->user_phone }}
            </td>
        </tr>

        <tr class="heading">
            <td>
                Product
            </td>

            <td>
                Price
            </td>

            <td>
                Quantity
            </td>

            <td>
                Total
            </td>

        </tr>

        @foreach ($order->items as $key => $item)

            <tr class="item @if ($loop->last) last @endif">
                <td>
                    {{ $item['name'] ?? '' }}

                    @if ($item['order_form'] ?? false)
                      @component('ecommerce::pdfs.order-form-options', ['form' => $item['order_form'], 'options' => $item['options'] ?? []])
                      @endcomponent
                    @else
                        @if (!empty($item['options'] ?? ''))
                            <ul>
                                @foreach ($item['options'] as $key => $options)
                                    @if (is_array($options['value'] ?? $options))
                                        <li class="cart_option font-weight-bold">{{ ucfirst($key) }}</li>
                                        <ul>
                                            <li class="cart_option"><span class="font-weight-bold">
                                                @foreach ($options['value'] ?? $options  as $key => $option)
                                                  <strong>{{ ucfirst($key) }}</strong>: </span>{{ $option['value'] ?? $option }}@if (!$loop->last),@endif
                                                @endforeach
                                            </li>
                                        </ul>
                                    @else
                                            <li class="cart_option"><strong>{{ ucfirst($key) }}</strong> {{ $options['value'] ?? $options }}</li>
                                    @endif
                                @endforeach
                            </ul>
                        @endif
                    @endif
                </td>

                <td>
                    {{ ($order->cart['currency'] ?? '£') . ($item['price'] ?? '') }}
                </td>

                <td>
                    {{ $item['quantity'] ?? '' }}
                </td>

                <td>
                    {{ ($order->cart['currency'] ?? '£') . ($item['subtotal'] ?? '') }}
                </td>
            </tr>
        @endforeach

        @foreach ($order->cart['totals'] ?? [] as $key => $total)
            <tr class="total @if ($loop->last) last @endif">
                <td></td>
                <td></td>
                <td>{{ $key }}: </td>
                <td>
                    {{ ($order->cart['currency'] ?? '£') . $total }}
                </td>
            </tr>
        @endforeach
    </table>
</div>
@if (isset($page_break) && $page_break)
    <div class="page_break"></div>
@endif
