<div class="invoice-box">
    <h1 style="text-align: center;">Delivery Note</h1>
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
                Job No Ref: #{{ $order->invoice['number'] ?? '' }}<br>
                Created: {{ $order->invoice['issued_at'] ?? '' }}<br>
              </td>
            </tr>
          </td>
        </tr>

        <tr class="details">
            <td colspan="2">
                <strong>Company Name / Address</strong>
            </td>

            <td colspan="2">
              @foreach ($order->shipping_address as $key => $address_line)
                {{ $address_line }}@if (!$loop->last), @endif
              @endforeach
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
            <td style="padding-bottom: 20px" colspan="2">
                <strong>Telephone</strong>
            </td>

            <td colspan="2">
                {{ $order->user_phone }}
            </td>
        </tr>

        <tr class="details">
            <td colspan="2">
                <strong>Date Ordered</strong>
            </td>

            <td colspan="2">
                {{ $order->invoice['issued_at'] }}
            </td>
        </tr>

        <tr class="details">
            <td style="padding-bottom: 40px" colspan="2">
                <strong>Date Delivered</strong>
            </td>

            <td colspan="2">
                {{ now()->toFormattedDateString() }}
            </td>
        </tr>

        <tr class="heading">
            <td colspan="2">
                Product
            </td>

            <td colspan="2">
                Quantity
            </td>
        </tr>

        @foreach ($order->items as $key => $item)
          <tr class="item @if ($loop->last) last @endif">
            <td colspan="2">
                @php($variant = $item['variant']['name'] ?? null)
                @if ($variant)<strong>{{ $variant }}</strong>/ @endif{{ $item['name'] ?? '' }}
            </td>

            <td colspan="2">
                {{ $item['quantity'] ?? '' }}
            </td>
          </tr>
        @endforeach
    </table>

    <h2 style="text-align: center; margin-top: 40px; margin-bottom: 0px;">PLEASE CHECK FOR ANY DAMAGES BEFORE SIGNING FOR YOUR GOODS. ALL DAMAGES MUST BE REPORTED WITHIN 24HRS </h2>

    <table cellpadding="0" cellspacing="10">
      <tr class="top">
        <td colspan="4">
          <tr>
            <td class="title" colspan="2" style="border: solid; padding: 10px 20px;">
              <h3 style="margin-bottom: 0px; padding-bottom: 0px; margin-block-start: 0; margin-block-end: 0;">I HAVE COUNTED THE ITEMS.</h3>
              <p style="margin-top: 0px; padding-top: 0px; margin-block-start: 0; margin-block-end: 0; line-height: 1.2;">The correct quantity has been delivered:</p>
              <p>Signed:_____________________________________</p>
              <p>Print Name:_________________________________</p>
              <p style="margin-block-start: 0; margin-block-end: 0; line-height: 1.2;"><strong>IMPORTANT – IF COUNTING REFUSED</strong></p>
              <p style="margin-block-start: 0; margin-block-end: 0; line-height: 1.2;">I have refused to count the items delivered. I now understand and agree that no claim for undelivered goods can be made.</p>
              <p>Signed:_____________________________________</p>
              <p>Print Name:_________________________________</p>
            </td>

            <td class="title" colspan="2" style="border: solid; padding: 10px 20px; text-align: left;">
              <h3 style="margin-bottom: 0px; padding-bottom: 0px; margin-block-start: 0; margin-block-end: 0;">I HAVE CHECKED THE ITEMS FOR DAMAGES.</h3>
              <p style="margin-top: 0px; padding-top: 0px; margin-block-start: 0; margin-block-end: 0; line-height: 1.2;">The items delivered are undamaged:</p>
              <p>Signed:_____________________________________</p>
              <p>Print Name:_________________________________</p>
              <p style="margin-block-start: 0; margin-block-end: 0; line-height: 1.2;"><strong>IMPORTANT – IF DAMAGE CHECKING REFUSED</strong></p>
              <p style="margin-block-start: 0; margin-block-end: 0; line-height: 1.2;">I have refused to check the items delivered. I now understand and agree that no claim for damaged goods can be made.</p>
              <p>Signed:_____________________________________</p>
              <p>Print Name:_________________________________</p>
            </td>
          </tr>
        </td>
      </tr>
    </table>


</div>
@if (isset($page_break) && $page_break === true)
    {{-- <div class="page_break"></div> --}}
@endif

<div class="footer_text">
  <p><strong>{{ Setting::get('Company Name') }}</strong></p>
  <p>{{ Setting::get('Company Address') }}</p>
  <p>
    @if (Setting::get('Company No'))
      <span>Company Number: </span>{{ Setting::get('Company No') }}
      @if (Setting::get('Company Vat No'))
        |
      @endif
    @endif
    @if (Setting::get('Company Vat No'))
      <span>Company VAT Number: </span>{{ Setting::get('Company Vat No') }}
    @endif
  </p>
</div>
