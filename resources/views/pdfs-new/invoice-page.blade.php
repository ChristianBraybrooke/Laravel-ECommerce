
    @php

        $billing_address    = 'Hinks Insurance</br>Julie Thurlow</br>16 Wright Street</br>Hull, HU2 8JU';
        $billing_tel        = '01482 323424';
        $billing_email      = 'julie@hinks.co.uk';

        $items              = [
                                [
                                    'name' => '<strong>Selection Double Enclosed</strong></br>Selection Double Enclosed Toilet Cubicle Set</br>18mm MFC</br>Dark Mountain Oak</br>1680 x 1680mm',
                                    'quantity' => '1',
                                    'amount' => '598.75',
                                    'subtotal' => '598.75'
                                ],
                                [
                                    'name' => '<strong>Selection Double Enclosed</strong></br>Selection Double Enclosed Toilet Cubicle Set</br>18mm MFC</br>Dark Mountain Oak</br>1680 x 1680mm',
                                    'quantity' => '1',
                                    'amount' => '598.75',
                                    'subtotal' => '598.75'
                                ]
                            ];

        $shipping_cost      = "50.00";

        $estimate_id        = rand(1000,9999);
        $estimate_date      = date_create();
        $estimate_expire    = date_add(date_create(), date_interval_create_from_date_string("7 days"));

    @endphp


    <body class="A4 portrait">

        <section class="sheet">

            <div class="header-elements">

                <div class="logo">
                    <img src="{{ url('public/img/logo.png') }}">
                </div>

                <div class="estimate">
                    <h1>{{ $order->invoice['name'] }}</h1>
                </div>

                <div class="address text-right">
                    <p>
                        <strong>Toilet Cubicles Online</strong></br>
                        Cubicle House</br>
                        Unit 2, Brighton Mill</br>
                        Oldham, OL13QF</br>
                        United Kingdom
                    </p>

                    <p>
                        0161 6268080</br>
                        sales@toiletcubiclesonline.co.uk
                    </p>
                </div>

            </div>

            <div class="estimate-info">
                <div class="billing-address">
                    <p>
                        <span class="billing-title">BILL TO</span></br>
                        {{-- {!! $billing_address !!} --}}
                        @foreach ($order->billing_address as $key => $billing_address)
                            {{ $billing_address }} @if ($billing_address) <br> @endif
                        @endforeach
                    </p>
                    <p>
                        {{ $billing_tel }}</br>
                        {{ $billing_email }}
                    </p>
                </div>

                <div class="estimate-details">
                    <table>
                        <tr>
                            <td class="text-right header">{{ $order->invoice['name'] }} #:</td>       <td>{{ $estimate_id }}</td>
                        </tr>
                        <tr>
                            <td class="text-right header">{{ $order->invoice['name'] }} Date:</td>         <td>{{ $estimate_date->format('Y-m-d') }}</td>
                        </tr>
                        <tr>
                            <td class="text-right header">Expires On:</td>            <td>{{ $estimate_expire->format('Y-m-d') }}</td>
                        </tr>

                        <tr class="total">
                            <td class="text-right header">Grand Total (GBP):</td>     <td>{{ $order->cart['currency'] }}{{ $order->cart['totals']['Total'] ?? '' }}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="items-list">

                <table>
                    <tr class="header">
                        <td>Items</td>
                        <td>Quantity</td>
                        <td>Price</td>
                        <td>Amount</td>
                    </tr>

                    @foreach ($order->items as $key => $item)

                        <tr>
                            <td>
                                <p>
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
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ $item['quantity'] ?? '' }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ ($order->cart['currency'] ?? '£') . ($item['price'] ?? '') }}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ ($order->cart['currency'] ?? '£') . ($item['subtotal'] ?? '') }}
                                </p>
                            </td>
                        </tr>

                    @endforeach

                    <tr>
                        <td>
                            <p>
                                * WE WILL PRICE MATCH OR BEAT ANY OFFICAL QUOTE *
                            </p>
                            <p>
                                * TERMS AND CONDITIONS APPLY *
                            </p>
                        </td>
                    </tr>
                </table>

            </div>

            <div class="items-totals">
                <div class="totals">
                    <table class="text-right">
                        @foreach ($order->cart['totals'] ?? [] as $key => $total)
                            <tr class="total @if ($loop->last) last @endif">
                                <td class="header">{{ $key }}: </td>
                                <td>
                                    {{ ($order->cart['currency'] ?? '£') . $total }}
                                </td>
                            </tr>
                        @endforeach
                    </table>
                </div>
            </div>

        </section>


        {{-- <div class="ui-box noprint">
            <a href="{{ route('invoice.generate') }}">Generate PDF</a>
        </div> --}}
