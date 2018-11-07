<div class="invoice-box">
    <h1 style="text-align: center;">{{ $order->invoice['name'] ?? '' }}</h1>
    <table cellpadding="0" cellspacing="0">
        <tr class="top">
            <td colspan="4">
                <tr>
                    <td class="title" colspan="2">
                        @if (isset($logo) && $logo->url)
                            <img src="data:image/jpeg;base64, {{ base64_encode(@file_get_contents(asset($logo->url))) }}" alt="{{ url(optional($logo)->url) }}" style="width:auto; max-height: 50px;">
                        @endif
                    </td>

                    <td colspan="2">
                        {{ $order->status }} #: {{ $order->invoice['number'] ?? '' }}<br>
                        Created: {{ $order->invoice['issued_at'] ?? '' }}<br>
                    </td>
                </tr>
            </td>
        </tr>

        <tr class="information">
            <td colspan="2">
                <strong>Delivery Address</strong> <br>
                @foreach ($order->shipping_address as $key => $shipping_address)
                    @if ($shipping_address)<p class="address_line">{{ $shipping_address }}</p>@endif
                @endforeach
            </td>

            <td colspan="2">
                <strong>Billing Address</strong> <br>
                @foreach ($order->billing_address as $key => $billing_address)
                    @if ($billing_address)<p class="address_line">{{ $billing_address }}</p>@endif
                @endforeach
            </td>
        </tr>

        @if ($order->payment_method)
            <tr class="details">
                <td style="padding-top: 40px" colspan="2">
                    <strong>Payment Method</strong>
                </td>

                <td style="padding-top: 40px" colspan="2">
                    {{ $order->payment_method }}
                </td>
            </tr>
        @endif
        @foreach ($order->payments as $key => $payment)
            <tr class="details">
                <td @if ($loop->first && !$order->payment_method)style="padding-top: 40px"@endif colspan="2">
                    <strong>Payment Method</strong>
                </td>

                <td @if ($loop->first && !$order->payment_method)style="padding-top: 40px"@endif colspan="2">
                    @if ($payment->method === 'card')
                        {{ ucfirst($payment->source_brand) }} {{ $payment->source_last4 }}
                    @else
                        {{ ucfirst($payment->method) }}
                    @endif
                         - {{ $payment->currency }}{{ priceFormatter($payment->amount) }}
                         @if ($payment->refunded)
                            <strong style="color: red">Refunded</strong>
                         @endif
                </td>
            </tr>
        @endforeach

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
                <td style="max-width: 200px;">
                    @php($variant = $item['variant']['name'] ?? null)
                    @if ($variant)<strong>{{ $variant }}</strong>/ @endif{{ $item['name'] ?? '' }}

                    @if ($item['order_form'] ?? false)
                      @component('ecommerce::pdfs.order-form-options', ['form' => $item['order_form'], 'options' => $item['options'] ?? []])
                      @endcomponent
                    @else
                        @if (!empty($item['options'] ?? ''))
                            <ul class="options_list">
                                @foreach ($item['options'] as $key => $options)
                                    @if (is_array($options['value'] ?? $options))
                                      <li class="cart_option font-weight-bold">
                                        @foreach ($options['value'] ?? $options  as $key => $option)
                                          <strong>{{ ucfirst($key) }}</strong>: </span>{{ $option['value'] ?? $option }}@if (!$loop->last),@endif
                                        @endforeach
                                      </li>
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
            @if ($total > 0 && ($key !== 'Total' || $key !== 'VAT'))
              <tr class="total @if ($loop->last) last @endif">
                  <td></td>
                  <td></td>
                  <td>{{ $key }}: </td>
                  <td>
                      {{ ($order->cart['currency'] ?? '£') . $total }}
                  </td>
              </tr>
            @endif
        @endforeach
    </table>
</div>
@if (isset($page_break) && $page_break === true)
    {{-- <div class="page_break"></div> --}}
@endif
