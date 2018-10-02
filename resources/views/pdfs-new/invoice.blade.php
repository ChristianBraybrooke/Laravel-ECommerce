<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Print</title>
    @component('ecommerce::pdfs-new.print-style')
    @endcomponent
</head>

<body class="a4 portrait">

  @if (!isset($orders->id) && $orders)
      @foreach ($orders as $key => $order)
          @component('ecommerce::pdfs-new.invoice-page', ['order' => $order, 'page_break' => true])
          @endcomponent
      @endforeach
  @elseif(isset($orders->id) && !empty($orders->id))
      @component('ecommerce::pdfs-new.invoice-page', ['order' => $orders, 'page_break' => false])
      @endcomponent
  @else
      <h1 style="text-align:center;">Unable to generarate invoice.</h1>
  @endif

  @if (isset($pdf) && $pdf)

  @else
      {{-- @component('ecommerce::pdfs.print-btn')
      @endcomponent --}}
  @endif




</body>
</html>
